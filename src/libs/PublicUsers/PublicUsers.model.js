const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const PublicUsers = require("../../models/PublicUsers")(sequelize, Sequelize);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { resolve } = require("path");
const { rejects } = require("assert");
const forgotPassword = require("../Utils/ForgotPassword");
const Mailer = require("../Utils/Mailer");

PublicUsers.sync({ force: false });

exports.createAccount = (MobileData) => {
  return new Promise(async (resolve, reject) => {
    if (MobileData.Password === undefined) {
      return reject({ error: "Body is required!!!" });
    }

    //Encrypt user password
    MobileData.Password = await bcrypt.hash(MobileData.Password, 10);

    //check email
    PublicUsers.findAll({
      where: {
        Phone: MobileData.Phone,
      },
    }).then(
      (result) => {
        if (result.length == 0) {
          PublicUsers.create(MobileData).then(
            (result) => {
              resolve({
                success: "Customer Created successfully",
                token: result.dataValues.UserID,
              });
            },
            (err) => {
              reject({ error: "User creation failed" });
            }
          );
        } else {
          reject({ error: "This user exists!!!" });
        }
      },
      (err) => {
        reject({ error: "Something went wrong" });
      }
    );
  });
};

exports.userlogin = (res, MobileData) => {
  return new Promise(async (resolve, reject) => {
    //check email
    PublicUsers.findAll({
      where: {
        Phone: MobileData.Phone,
      },
      raw: true,
    }).then(
      async (result) => {
        if (result.length === 0)
          return reject({ error: "This user does not exist!" });
        if (await bcrypt.compare(MobileData.Password, result[0].Password)) {
          if (!result[0].Status) {
            return reject({ error: "Account disabled by Administrator" });
          }
          const token = jwt.sign(
            {
              UserID: result[0].UserID,
              Name: result[0].Name,
              Email: result[0].Email,
              Status: result[0].Status,
              Phone: result[0].Phone,
            },
            process.env.TOKEN_KEY_USR,
            {
              expiresIn: "1h",
            }
          );
          res.cookie("cilbup_mathira", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          });
          resolve({ token: token, success: "Login successful" });
        } else {
          reject({ error: "Wrong Password" });
        }
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.forgotPassword = async (MobileData) => {
  if (MobileData.Email) {
    return new Promise((resolve, reject) => {
      PublicUsers.findAll({
        where: {
          Email: MobileData.Email,
        },
        raw: true,
      }).then(
        async (result) => {
          if (result.length === 0) {
            reject({ error: "This user does not exist!" });
          }
          if (result.length != 0) {
            const pass = Math.random().toString(36).slice(-8);
            const name = result[0].Name;
            const email = result[0].Email;
            MobileData.Password = await bcrypt.hash(pass, 10);
            PublicUsers.update(MobileData, {
              where: {
                Email: MobileData.Email,
              },
            }).then(
              async (result) => {
                const content = await forgotPassword.getContent(
                  "Admin",
                  name,
                  pass
                );
                Mailer.sendMail("Password reset successful!", email, content);
                resolve({ success: "Password reset link sent to your email!" });
              },
              (err) => {
                reject({ error: "Email not sent!" });
              }
            );
          }
        },
        (err) => {
          reject({ error: "Retrieve failed" });
        }
      );
    });
  } else {
    return new Promise((resolve, reject) => {
      reject({ error: "Email is required!" });
    });
  }
};

exports.findAuthById = (id) => {
  return new Promise((resolve, reject) => {
    PublicUsers.findByPk(id).then(
      (result) => {
        if (result == null) {
          reject({ error: "User not found" });
        }
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.updateAuthById = async (MobileData, userID) => {
  if (MobileData.Password) {
    return new Promise((resolve, reject) => {
      PublicUsers.findAll({
        where: {
          UserID: userID,
        },
        raw: true,
      }).then(
        async (result) => {
          if (result.length === 0) {
            reject({ error: "This user does not exist!" });
          }
          if (
            result.length != 0 &&
            (await bcrypt.compare(MobileData.Password, result[0].Password))
          ) {
            MobileData.Password = await bcrypt.hash(MobileData.NewPassword, 10);

            PublicUsers.update(MobileData, {
              where: {
                UserID: userID,
              },
            }).then(
              (result) => {
                resolve({ success: "New password Updated Successfully!" });
              },
              (err) => {
        
                reject({ error: "Failed" });
              }
            );
          } else {
            reject({ error: "Old Password Incorrect" });
          }
        },
        (err) => {
          reject({ error: "Failed" });
        }
      );
    });
  } else {
    return new Promise((resolve, reject) => {
      PublicUsers.update(MobileData, {
        where: {
          UserID: userID,
        },
      }).then(
        (result) => {
          resolve({ success: "Updated Successfully" });
        },
        (err) => {
          reject({ error: "Failed" });
        }
      );
    });
  }
};

exports.findAllPublicUsers = () => {
  return new Promise((resolve, reject) => {
    PublicUsers.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).send({ success: "Logout successful" });
};

exports.findPublicUsersPaginated = (offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, meta] = await sequelize.query(
        `SELECT * FROM "PublicUsers" ORDER BY "updatedAt" DESC LIMIT 12 OFFSET ${offset} `
      );
      const [count, cnmeta] = await sequelize.query(
        `SELECT COUNT(*)::int As total FROM "PublicUsers"`
      );
      const [active, acmeta] = await sequelize.query(
        `SELECT COUNT(*)::int AS total FROM "PublicUsers" WHERE "Status" = 'true'`
      );
      const [inactive, inmeta] = await sequelize.query(
        `SELECT COUNT(*)::int AS total FROM "PublicUsers" WHERE "Status" = 'false'`
      );
      resolve({
        result: result,
        total: count[0].total,
        active: active[0].total,
        inactive: inactive[0].total,
      });
    } catch (error) {
      
      reject({ error: "Retrieve Failed!" });
    }
  });
};

exports.quickSearch = (q, offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, meta] = await sequelize.query(
        `SELECT * FROM "PublicUsers" WHERE "Name" ILIKE '%${q}%' LIMIT 12 OFFSET ${offset};`
      );
      const [count, cnmeta] = await sequelize.query(
        `SELECT COUNT(*)::int As total FROM "PublicUsers" WHERE "Name" ILIKE '%${q}%'`
      );
      resolve({ result: result, total: count[0].total });
    } catch (error) {
      reject({ error: "Retrieve Failed!" });
    }
  });
};

exports.deleteUserById = (UserID) => {
  return new Promise((resolve, reject) => {
    PublicUsers.destroy({
      where: {
        UserID: UserID,
      },
    }).then(
      (result) => {
        if (result != 0) resolve({ success: "Deleted successfully!!!" });
        else reject({ success: "User does not exist!!!" });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};
