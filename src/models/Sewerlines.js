const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = (sequelize) => {
  const SewerLines = sequelize.define("SewerLines", {
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    geom: {
      type: DataTypes.GEOMETRY("LINESTRING", 4326),
      allowNull: true,
    },
    Name: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    LineType: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    Diameter: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    PipeMaterial: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    Status: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    OutfallingTrunk: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    YearOfInstallation: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    Remarks: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    Photo: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    Zone: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    SubZones: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
  });

  return SewerLines;
};
