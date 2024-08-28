const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const WaterPipes = sequelize.define("WaterPipes", {
    ID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    RecTime: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    Length: {
      type: DataTypes.DOUBLE, 
    },
    Name: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    Diameter: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    Material: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    Class: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    Status: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    Distribution: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    Year: {
      type: DataTypes.DOUBLE, 
      allowNull: true,
    },
    Layer: {
      type: DataTypes.STRING, 
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
    Route: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    geom: {
      type: DataTypes.GEOMETRY("LineString", 4326), 
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('now()'), 
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('now()'), 
    },
  }, {
    tableName: 'WaterPipes', 
    timestamps: true, 
  });

  return WaterPipes;
};
