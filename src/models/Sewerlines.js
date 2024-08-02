const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const SewerLines = sequelize.define("SewerLines", {
    ID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Material: {
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
    geom: {
      type: DataTypes.GEOMETRY("MultiLineString", 4326),
      allowNull: true,
    },
    User: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Remarks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return SewerLines;
};
