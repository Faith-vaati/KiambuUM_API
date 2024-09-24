const Sequelize = require("sequelize");
const sequelize = require("../configs/connection");

module.exports = (sequelize, DataTypes) => {
  const ProductionMeterReadings = sequelize.define("ProductionMeterReadings", {
    ID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    MeterName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Units: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Date: {
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
  });

  return ProductionMeterReadings;
};
