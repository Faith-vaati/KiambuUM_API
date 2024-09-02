const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const PublicUsers = sequelize.define("PublicUsers", {
    UserID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }

  });
  return PublicUsers;
};
