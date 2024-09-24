const Sequelize = require("sequelize");
const sequelize = require("../configs/connection");

module.exports = (sequelize, DataTypes) => {
  const NRWInterventions = sequelize.define("NRWInterventions", {
    ID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    Longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    Altitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    Scope: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AccountNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    MeterActivity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    MeterModel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    NewMeterModel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    HighFlowResult: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LowFlowResult: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TestResult: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    MeterReadings: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    OldMeterReading: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    NewMeterReading: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    NewMeterSerial: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    OldMeterSerial: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ServiceReport: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    MeterPhotos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PhotoAfter: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ActivityPhoto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    geom: {
      type: DataTypes.GEOMETRY("POINT", 4326),
      allowNull: true,
    },
  });

  return NRWInterventions;
};
