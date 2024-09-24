const Sequelize = require("sequelize");
const sequelize = require("../configs/connection");

module.exports = (sequelize, DataTypes) => {
  const DMAMeterReadings = sequelize.define("DMAMeterReadings", {
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
  });

  return DMAMeterReadings;
};
