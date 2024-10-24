const Sequelize = require("sequelize");
const sequelize = require("../configs/connection");

module.exports = (sequelize, DataTypes) => {
  const NRWMeterReadings = sequelize.define("NRWMeterReadings", {
    ID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    DMAName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    MeterType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    AccountNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Units: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    MeterStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Remarks: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    Longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    geom: {
      type: DataTypes.GEOMETRY("POINT", 4326),
      allowNull: true,
    },
  });

  return NRWMeterReadings;
};
