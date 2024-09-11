const Sequelize = require("sequelize");
const sequelize = require("../configs/connection");

module.exports = (sequelize, DataTypes) => {
  const Tanks = sequelize.define("Tanks", {
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
    Longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    Latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    Material: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Capacity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Zone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Subzone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Remarks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Shape: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    YearOfInstallation: {
      type: DataTypes.DOUBLE,
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
      type: DataTypes.GEOMETRY("POINTZM", 4326),
      allowNull: true,
    },
  });

  return Tanks;
};
