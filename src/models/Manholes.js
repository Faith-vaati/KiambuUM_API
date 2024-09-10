const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Manholes = sequelize.define("Manholes", {
    ID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Name: {
      type: Sequelize.STRING(254),
      allowNull: true,
    },
    Latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    Longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    LineName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    LineDiameter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Depth: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    NoOfConnections: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Condition: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    YearOfInstallation: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    Remarks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    geom: {
      type: DataTypes.GEOMETRY("POINT", 4326),
      allowNull: true,
    },
  });

  return Manholes;
};
