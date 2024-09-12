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
      type: DataTypes.FLOAT, 
      allowNull: true,
    },
    Latitude: {
      type: DataTypes.FLOAT, 
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
    DMAName: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    Diameter: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    MeterSerial: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    YearOfInstallation: {
      type: DataTypes.DOUBLE, 
      allowNull: true,
    },
    BrandName: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    MeterType: {
      type: DataTypes.DOUBLE, 
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
      type: DataTypes.STRING, 
      allowNull: true,
    },
    geom: {
      type: DataTypes.GEOMETRY('POINT', 4326),
      allowNull: true,
    },
  },);

  return MasterMeters;
};
