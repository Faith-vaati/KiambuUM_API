const Sequelize = require("sequelize");
const sequelize = require("../configs/connection");

module.exports = (sequelize, DataTypes) => {
  const Valves = sequelize.define(
    "Valves",
    {
      ID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      Latitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      Longitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      YearOfInstallation: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      Zone: {
        type: DataTypes.STRING(254),
        allowNull: true,
      },
      Type: {
        type: DataTypes.STRING(254),
        allowNull: true,
      },
      Diameter: {
        type: DataTypes.STRING(254),
        allowNull: true,
      },
      PipelineName: {
        type: DataTypes.STRING(254),
        allowNull: true,
      },
      Status: {
        type: DataTypes.STRING(254),
        allowNull: true,
      },
      Photo: {
        type: DataTypes.STRING(254),
        allowNull: true,
      },
      Name: {
        type: DataTypes.STRING(254),
        allowNull: true,
      },
      Remarks: {
        type: DataTypes.STRING(254),
        allowNull: true,
      },
      Depth: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      geom: {
        type: DataTypes.GEOMETRY("POINT", 4326),
        allowNull: true,
      },
    },
  );

  return Valves;
};
