const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const WaterPipes = sequelize.define("WaterPipes", {
    ID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    ObjectID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    LineName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Material: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Intake: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Coordinates: {
      type: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.DECIMAL)),
      allowNull: true,
    },
    Type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Function: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    DMA: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    SchemeName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Route: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Zone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Size: {
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
    geom: {
      type: DataTypes.GEOMETRY("MultiLineString", 4326),
      allowNull: true,
    },
  });
  return WaterPipes;
};
