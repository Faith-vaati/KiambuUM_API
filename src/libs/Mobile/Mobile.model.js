const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const Mobile = require("../../models/Mobile")(sequelize, Sequelize);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const forgotPassword = require("../Utils/ForgotPassword");
const Mailer = require("../Utils/Mailer");

Mobile.sync({ force: false });
exports.createAuth = (MobileData) => {
  return new Promise(async (resolve, reject) => {
    if (MobileData.Password === undefined) {
      return reject({ error: "Body is required!!!" });
    }

    //Encrypt user password
    MobileData.Password = await bcrypt.hash(MobileData.Password, 10);

    //check email
    Mobile.findAll({
      where: {
        Email: MobileData.Email,
      },
    }).then(
      (result) => {
        if (result.length == 0) {
          Mobile.create(MobileData).then(
            (result) => {
              resolve({ success: "User created successfully" });
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

exports.Login = (res, MobileData) => {
  return new Promise(async (resolve, reject) => {
    //check email
    Mobile.findAll({
      where: {
        Email: MobileData.Email,
      },
      raw: true,
    }).then(
      async (result) => {

        if (result.length === 0)
          return reject({ error: "This user does not exist!" });
        if (
          result[0].Role === "Enumerator" &&
          (await bcrypt.compare(MobileData.Password, result[0].Password))
        ) {
          if (!result[0].Status) {
            return reject({ error: "Account disabled by Administrator" });
          }

          const token = jwt.sign(
            {
              UserID: result[0].UserID,
              Name: result[0].Name,
              Email: result[0].Email,
              Position: result[0].Position,
              Department: result[0].Department,
              Status: result[0].Status,
              Role: result[0].Role,
              Phone: result[0].Phone,
            },
            process.env.TOKEN_KEY_USR,
            {
              expiresIn: "2h",
            }
          );

          res.cookie("cilbup_ksa", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          });

          resolve({ token: token, success: "Login successful" });
        } else {
          reject({ error: "User Authentication failed" });
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
      Mobile.findAll({
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
            Mobile.update(MobileData, {
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
    Mobile.findByPk(id).then(
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

exports.updateAuthById = async (MobileData, AuthID) => {
  if (MobileData.Password) {
    return new Promise((resolve, reject) => {
      Mobile.findAll({
        where: {
          UserID: AuthID,
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

            Mobile.update(MobileData, {
              where: {
                UserID: AuthID,
              },
            }).then(
              (result) => {
                resolve({ success: "New password Updated Successfully!" });
              },
              (err) => {
                reject({ error: "Retrieve failed" });
              }
            );
          } else {
            reject({ error: "Old Password Incorrect" });
          }
        },
        (err) => {
          reject({ error: "Retrieve failed" });
        }
      );
    });
  } else {
    return new Promise((resolve, reject) => {
      Mobile.update(MobileData, {
        where: {
          UserID: AuthID,
        },
      }).then(
        (result) => {
          resolve({ success: "Updated Successfully" });
        },
        (err) => {
          reject({ error: "Retrieve failed" });
        }
      );
    });
  }
};

exports.deleteAuthById = (AuthID) => {
  return new Promise((resolve, reject) => {
    Mobile.destroy({
      where: {
        UserID: AuthID,
      },
    }).then(
      (result) => {
        if (result != 0) resolve({ success: "Deleted successfully!!!" });
        else reject({ error: "User does not exist!!!" });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findAllAuth = () => {
  return new Promise((resolve, reject) => {
    Mobile.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findAuthPaginated = (offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, meta] = await sequelize.query(
        `SELECT * FROM "Mobiles" ORDER BY "createdAt" DESC LIMIT 12 OFFSET ${offset}`
      );
      const [count, cnmeta] = await sequelize.query(
        `SELECT COUNT(*)::int As total FROM "Mobiles"`
      );
      const [active, acmeta] = await sequelize.query(
        `SELECT COUNT(*)::int AS total FROM "Mobiles" WHERE "Status" = 'true'`
      );
      const [inactive, inmeta] = await sequelize.query(
        `SELECT COUNT(*)::int AS total FROM "Mobiles" WHERE "Status" = 'false'`
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
        `SELECT * FROM "Mobiles" WHERE "Name" ILIKE '%${q}%' LIMIT 12 OFFSET ${offset};`
      );
      const [count, cnmeta] = await sequelize.query(
        `SELECT COUNT(*)::int As total FROM "Mobiles" WHERE "Name" ILIKE '%${q}%'`
      );
      resolve({ result: result, total: count[0].total });
    } catch (error) {
      reject({ error: "Retrieve Failed!" });
    }
  });
};

exports.logout = (res) => {
  return new Promise((resolve, reject) => {
    try {
      res.cookie("nimda_ksa", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      resolve({ success: "Logout successful" });
    } catch (error) {
      reject({ error: "logout failed!" });
    }
  });
};
