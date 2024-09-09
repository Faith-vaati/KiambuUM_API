const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Boreholes = sequelize.define(
    "Boreholes",
    {
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
      Yield: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      PipeDiameter: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Zone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      CasingDiameter: {
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
    },
    {
      paranoid: true, 
    }
  );

  return Boreholes;
};
