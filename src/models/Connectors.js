const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Connectors = sequelize.define("Connectors", {
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
    Type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Diameter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Diameter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Diameter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Zone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Material: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    YearOfInstallation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Remarks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Photo: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
  });

  return Connectors;
};
