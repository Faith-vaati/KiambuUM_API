const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const NRWLeakages = sequelize.define("NRWLeakages", {
    ID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    SerialNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Type: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Leakage",
    },
    DMAName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    DateReported: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Received",
    },
    ReportedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    NRWUserID: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    DateResolved: {
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
  });
  return NRWLeakages;
};
