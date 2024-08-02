const env = require("./env");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(env.db_name, env.db_username, env.db_password, {
  host: env.db_host,
  dialect: env.db_dialect,
  timezone: "Africa/Nairobi",
  define: {
    charset: "utf8",
    collate: "utf8_general_ci",
    timestamps: true,
  },
  pool: {
    max: 50000000,
    min: 0,
    acquire: 3000000,
    idle: 100000,
  },
});
module.exports = sequelize;
