const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const WaterPipes = sequelize.define("WaterPipes", {
    ID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    LineType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Name: {
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
    Subzone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    PipeMaterial: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    YearLaid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Class: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Distribution: {
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
    User: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Photo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    geom: {
      type: DataTypes.GEOMETRY("MULTILINESTRING", 4326),
      allowNull: true,
    },
  });

  return WaterPipes;
};
