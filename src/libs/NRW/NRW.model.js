const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const NRW = require("../../models/NRW")(sequelize, Sequelize);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const forgotPassword = require("../Utils/ForgotPassword");
const Mailer = require("../Utils/Mailer");

NRW.sync({ force: false });
exports.createNRW = (NRWData) => {
  return new Promise(async (resolve, reject) => {
    if (NRWData.Password === undefined) {
      return reject({ error: "Body is required!!!" });
    }

    //Encrypt user password
    NRWData.Password = await bcrypt.hash(NRWData.Password, 10);

    //check email
    NRW.findAll({
      where: {
        Email: NRWData.Email,
      },
    }).then(
      (result) => {
        if (result.length == 0) {
          NRW.create(NRWData).then(
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

exports.loginNRW = (res, NRWData) => {
  return new Promise(async (resolve, reject) => {
    //check email
    if (NRWData?.Email == undefined)
      reject({ error: "Email address is required!" });
    NRW.findAll({
      where: {
        Email: NRWData.Email,
      },
      raw: true,
    }).then(
      async (result) => {
        if (
          result.length != 0 &&
          (await bcrypt.compare(NRWData.Password, result[0].Password))
        ) {
          if (!result[0].Status)
            return reject({ error: "Account disabled by administrator!" });

          const token = jwt.sign(
            {
              UserID: result[0].UserID,
              Name: result[0].Name,
              Email: result[0].Email,
              Role: result[0].Role,
            },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );

          await NRW.update(
            { Token: token },
            {
              where: {
                UserID: result[0].UserID,
                Role: result[0].Role,
              },
            }
          );

          res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          });

          resolve({ token: token, success: "Login successful" });
        } else {
          reject({ error: "Authentication failed" });
        }
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.forgotPassword = async (NRWData) => {
  if (NRWData.Email) {
    return new Promise((resolve, reject) => {
      NRW.findAll({
        where: {
          Email: NRWData.Email,
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
            NRWData.Password = await bcrypt.hash(pass, 10);
            NRW.update(NRWData, {
              where: {
                Email: NRWData.Email,
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

exports.findNRWById = (id) => {
  return new Promise((resolve, reject) => {
    NRW.findByPk(id).then(
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

exports.updateNRWById = async (NRWData, ID) => {
  if (NRWData.Password) {
    return new Promise((resolve, reject) => {
      NRW.findAll({
        where: {
          UserID: ID,
        },
        raw: true,
      }).then(
        async (result) => {
          if (result.length === 0) {
            reject({ error: "This user does not exist!" });
          }
          if (
            result.length != 0 &&
            (await bcrypt.compare(NRWData.Password, result[0].Password))
          ) {
            NRWData.Password = await bcrypt.hash(NRWData.NewPassword, 10);

            NRW.update(NRWData, {
              where: {
                UserID: ID,
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
      NRW.update(NRWData, {
        where: {
          UserID: ID,
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

exports.deleteNRWById = (ID) => {
  return new Promise((resolve, reject) => {
    NRW.destroy({
      where: {
        UserID: ID,
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

exports.findAllNRW = () => {
  return new Promise((resolve, reject) => {
    NRW.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findNRWPaginated = (offset) => {
  return new Promise((resolve, reject) => {
    NRW.findAll({
      offset: offset,
      limit: 12,
    }).then(
      async (result) => {
        const count = await NRW.count();
        const active = await NRW.count({ where: { Status: true } });
        const inactive = await NRW.count({ where: { Status: false } });
        resolve({
          result: result,
          total: count,
          active: active,
          inactive: inactive,
        });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
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
