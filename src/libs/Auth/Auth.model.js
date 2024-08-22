const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const Auth = require("../../models/Auth")(sequelize, Sequelize);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const forgotPassword = require("../Utils/ForgotPassword");
const Mailer = require("../../libs/Utils/Mailer");
const getContent = require("../Utils/NewUserEmailContent");

Auth.sync({ force: false });

exports.createAuth = (AuthData) => {
  return new Promise(async (resolve, reject) => {
    if (AuthData.Password === undefined) {
      return reject({ success: "Body is required!!!" });
    }

    //Encrypt user password
    AuthData.Password = await bcrypt.hash(AuthData.Password, 10);

    //check email
    Auth.findAll({
      where: {
        Email: AuthData.Email,
      },
    }).then(
      (result) => {
        if (result.length == 0) {
          Auth.create(AuthData).then(
            async (result) => {
              let content = await getContent.getContent(
                "Admin",
                result?.dataValues
              );
              Mailer.sendMail(
                "User Created Successfully",
                result?.dataValues?.Email,
                content
              );
              resolve({ success: "User created successfully" });
            },
            (err) => {
              reject({ success: "User creation failed" });
            }
          );
        } else {
          reject({ error: "This user exists!!!" });
        }
      },
      (err) => {
        reject({ success: "Something went wrong" });
      }
    );
  });
};

exports.loginAuth = (res, AuthData) => {
  return new Promise(async (resolve, reject) => {
    //check email
    if (AuthData?.Email == undefined)
      reject({ error: "Email address is required!" });
    Auth.findAll({
      where: {
        Email: AuthData.Email,
      },
      raw: true,
    }).then(
      async (result) => {
        if (result.length == 0)
          return reject({ error: "User does not exist!" });
        if (await bcrypt.compare(AuthData.Password, result[0].Password)) {
          if (!result[0].Status)
            return reject({ error: "Account disabled by administrator!" });
          if (await bcrypt.compare("123456", result[0].Password)) {
            firstTimeLogin = true;
          } else {
            firstTimeLogin = false;
          }

          const token = jwt.sign(
            {
              UserID: result[0].UserID,
              Name: result[0].Name,
              Email: result[0].Email,
              Role: result[0].Role,
              FirstTimeLogin: firstTimeLogin,
            },
            process.env.TOKEN_KEY,
            {
              expiresIn: "1h",
            }
          );

          await Auth.update(
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

exports.findAuthById = (id) => {
  return new Promise((resolve, reject) => {
    Auth.findByPk(id).then(
      (result) => {
        if (result == null) {
          reject({ status: 404, success: "Auth not found" });
        }
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.updateAuthById = async (AuthData, AuthID) => {
  if (AuthData.Password) {
    return new Promise((resolve, reject) => {
      Auth.findAll({
        where: {
          UserID: AuthID,
        },
        raw: true,
      }).then(
        async (result) => {
          if (result.length === 0) {
            reject({ error: "This user does not exist!" });
          }
          //(await bcrypt.compare(AuthData.Password, result[0].Password))
          if (
            result.length != 0 &&
            (await bcrypt.compare(AuthData.Password, result[0].Password))
          ) {
            AuthData.Password = await bcrypt.hash(AuthData.NewPassword, 10);

            Auth.update(AuthData, {
              where: {
                UserID: AuthID,
              },
            }).then(
              (result) => {
                resolve({ success: "Password Updated Successfully!" });
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
      Auth.update(AuthData, {
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
    Auth.destroy({
      where: {
        UserID: AuthID,
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

exports.findAllAuth = () => {
  return new Promise((resolve, reject) => {
    Auth.findAll({}).then(
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
        `SELECT * FROM "Auths"  ORDER BY "createdAt" DESC LIMIT 12 OFFSET ${offset}`
      );
      const [count, cnmeta] = await sequelize.query(
        `SELECT COUNT(*)::int As total FROM "Auths"`
      );
      const [active, acmeta] = await sequelize.query(
        `SELECT COUNT(*)::int AS total FROM "Auths" WHERE "Status" = 'true'`
      );
      const [inactive, inmeta] = await sequelize.query(
        `SELECT COUNT(*)::int AS total FROM "Auths" WHERE "Status" = 'false'`
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
        `SELECT * FROM "Auths" WHERE "Name" ILIKE '%${q}%' LIMIT 12 OFFSET ${offset};`
      );
      const [count, cnmeta] = await sequelize.query(
        `SELECT COUNT(*)::int As total FROM "Auths" WHERE "Name" ILIKE '%${q}%'`
      );
      resolve({ result: result, total: count[0].total });
    } catch (error) {
      reject({ error: "Retrieve Failed!" });
    }
  });
};

exports.findAuthAdmin = (q, offset) => {
  return new Promise((resolve, reject) => {
    Auth.findAll({
      where: {
        Role: q,
      },
      offset: offset,
      limit: 12,
      order: [["updatedAt", "DESC"]],
    }).then(
      async (result) => {
        const count = await Auth.count({
          where: {
            Role: q,
          },
        });
        resolve({
          result: result,
          total: count,
        });
      },
      (err) => {
        reject({ error: "failed" });
      }
    );
  });
};

exports.findAuthStatus = (q, offset) => {
  let query = q == "active" ? true : false;
  return new Promise((resolve, reject) => {
    Auth.findAll({
      where: {
        Status: query,
      },
      offset: offset,
      limit: 12,
      order: [["updatedAt", "DESC"]],
    }).then(
      async (result) => {
        const count = await Auth.count({
          where: {
            Status: query,
          },
        });
        resolve({
          result: result,
          total: count,
        });
      },
      (err) => {
        reject({ error: "failed" });
      }
    );
  });
};

exports.findAuthActivity = (offset) => {
  return new Promise((resolve, reject) => {
    Auth.findAll({
      offset: offset,
      limit: 6,
      order: [["updatedAt", "DESC"]],
      attributes: ["Name", "updatedAt", "createdAt"],
    }).then(
      async (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: "failed" });
      }
    );
  });
};

exports.logout = (res) => {
  return new Promise((resolve, reject) => {
    try {
      res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      resolve({ success: "Logout successful" });
    } catch (error) {
      reject(error);
    }
  });
};

exports.forgotPassword = async (AuthData) => {
  if (AuthData.Email) {
    return new Promise((resolve, reject) => {
      Auth.findAll({
        where: {
          Email: AuthData.Email,
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
            AuthData.Password = await bcrypt.hash(pass, 10);
            Auth.update(AuthData, {
              where: {
                Email: AuthData.Email,
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
                reject({ error: "Retrieve failed" });
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
