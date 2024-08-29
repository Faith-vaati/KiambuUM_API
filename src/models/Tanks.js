const Sequelize = require("sequelize");
const sequelize = require("../configs/connection");

module.exports = (sequelize, DataTypes) => {
  const Tanks = sequelize.define("Tanks", {
    ID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    Name: {
      type: DataTypes.STRING(254),
      allowNull: true,
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
      type: DataTypes.GEOMETRY("POINTZM", 4326),
      allowNull: true,
    },
    Elevation: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    
   
  
   
    Material: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    Capacity: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    Status: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    Remarks: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
   
    RecTime: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    Category: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    Type: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    Shape: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    Year: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    Picture: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
  });

  return Tanks;
};
