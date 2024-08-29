const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const CustomerMeters = sequelize.define("CustomerMeters", {
    ID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Phone: {
      type: DataTypes.STRING,
      allowNull: true,
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
    Zone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CurrentZone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Route: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    DMA: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SchemeName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Brand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    BrandName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Material: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    MeterMaterial: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Class: {
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
    MeterNo: {
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
    AccountStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    AccountType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Institution: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ParcelNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Installationtype: {
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
    User: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return CustomerMeters;
};
