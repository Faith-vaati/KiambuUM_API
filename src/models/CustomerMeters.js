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
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    Latitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    geom: {
      type: DataTypes.GEOMETRY("POINT", 4326),
      allowNull: true,
    },
    CurrentZone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    BrandName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    MeterMaterial: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    AccountNo: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    SerialNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    MeterSize: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    MeterType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    InstallationType: {
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
    OtherMete: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    FRecTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Remarks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    
  });

  return CustomerMeters;
};
