const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Appurtenances = sequelize.define("Appurtenances", {
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
    Name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Type: {
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
    Diameter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    InitialDiameter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ReducedDiameter: {
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
      type: DataTypes.TEXT,
      allowNull: true,
    },
    User: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    geom: {
      type: DataTypes.GEOMETRY("POINT", 4326),
      allowNull: true,
    },
  });
  return Appurtenances;
};
