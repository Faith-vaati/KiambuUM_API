const env = require("./env");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(env.db_name, env.db_username, env.db_password, {
  host: env.db_host,
  dialect: env.db_dialect,
  port: env.db_port,
  timezone: "Africa/Nairobi",
  define: {
    charset: "utf8",
    collate: "utf8_general_ci",
    timestamps: true, // Enables createdAt and updatedAt
    paranoid: true, // Enables deletedAt for soft deletion
  },
  pool: {
    max: 200,
    min: 5,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
