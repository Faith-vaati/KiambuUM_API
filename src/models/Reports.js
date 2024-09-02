const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Reports = sequelize.define("Reports", {
    ID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    SerialNo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Longitude: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    Latitude: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    geom: {
      type: DataTypes.GEOMETRY("POINT", 4326),
      allowNull: true,
    },
    Image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    Status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    NRWUserID: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    UserID: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    TaskResources: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    TaskRemarks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    TaskDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
  return Reports;
};
