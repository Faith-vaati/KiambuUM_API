const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const MasterMeters = sequelize.define("MasterMeters", {
    ID: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    RecTime: {
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
    Elevation: {
      type: DataTypes.DOUBLE, 
      allowNull: true,
    },
    OrthoHt: {
      type: DataTypes.DOUBLE, 
      allowNull: true,
    },
    Name: {
      type: DataTypes.STRING(254), 
      allowNull: true,
    },
    Diameter: {
      type: DataTypes.STRING(254), 
      allowNull: true,
    },
    MeterNo: {
      type: DataTypes.DOUBLE, 
      allowNull: true,
    },
    Type: {
      type: DataTypes.STRING(254), 
      allowNull: true,
    },
    Year: {
      type: DataTypes.DOUBLE, 
      allowNull: true,
    },
    Status: {
      type: DataTypes.STRING(254), 
      allowNull: true,
    },
    Route: {
      type: DataTypes.STRING(254), 
      allowNull: true,
    },
    DMA: {
      type: DataTypes.STRING(254), 
      allowNull: true,
    },
    Picture: {
      type: DataTypes.STRING(254), 
      allowNull: true,
    },
    geom: {
      type: DataTypes.GEOMETRY('POINT', 4326),
      allowNull: true,
    },
    Cover: {
      type: DataTypes.STRING(254), 
      allowNull: true,
    },
    Location: {
      type: DataTypes.STRING(254), 
      allowNull: true,
    },
    Remarks: {
      type: DataTypes.STRING(254), 
      allowNull: true,
    },
    User: {
      type: DataTypes.STRING(254), 
      allowNull: true,
    },
  }, {
    timestamps: true, 
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    defaultScope: {
      attributes: { exclude: ['updatedAt'] },
    },
  });

  return MasterMeters;
};
