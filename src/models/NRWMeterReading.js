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
    Interval: {
      type: DataTypes.STRING,
      allowNull: false,
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
    FirstReading: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    SecondReading: {
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
    SecondReadingDate: {
      type: DataTypes.STRING,
      allowNull: true,
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
