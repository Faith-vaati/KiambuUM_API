const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const MasterMeters = sequelize.define("MasterMeters", {
    ID: {
      type: DataTypes.UUID,
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
    BrandName: {
      type: DataTypes.STRING(254), 
      allowNull: true,
    },
    Diameter: {
      type: DataTypes.STRING(254), 
      allowNull: true,
    },
    MeterType: {
      type: DataTypes.DOUBLE, 
      allowNull: true,
    },
    MeterSerial: {
      type: DataTypes.STRING(254), 
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
    DMAName: {
      type: DataTypes.STRING(254), 
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
    geom: {
      type: DataTypes.GEOMETRY('POINT', 4326),
      allowNull: true,
    },
    
    
  
  },);

  return MasterMeters;
};
