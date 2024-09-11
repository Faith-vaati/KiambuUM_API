const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const CustomerMeters = sequelize.define("CustomerMeters", {
    ID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    Latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    MeterLocation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    BrandName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    AccountNo: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    MeterSerial: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Size: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    MeterType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    InstallationMode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Sewered: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    OtherMeter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Material: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Remarks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    User: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    geom: {
      type: DataTypes.GEOMETRY("POINT", 4326),
      allowNull: true,
    },
    
  });

  return CustomerMeters;
};
