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
    Scope: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    AccountNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    MeterActivity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    MeterModel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    NewMeterModel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    HighFlowResult: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    LowFlowResult: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    TestResult: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    MeterReadings: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    OldMeterReading: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    NewMeterReading: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    MeterSerial: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    NewMeterSerial: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    OldMeterSerial: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ServiceReport: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    NewOld_MeterPhotos: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    AfterRelocationPhoto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ActivityPhoto: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    User: {
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
