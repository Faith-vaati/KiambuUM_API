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
    FirstReadingDate: {
      type: DataTypes.STRING,
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

  // Add hooks to set SecondReading equal to FirstReading during creation
  NRWMeterReadings.beforeCreate((reading, options) => {
    reading.SecondReading = reading.FirstReading;
  });

  return NRWMeterReadings;
};
