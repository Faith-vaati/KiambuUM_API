const Sequelize = require("sequelize");
const sequelize = require("../configs/connection");

module.exports = (sequelize, DataTypes) => {
  const Valves = sequelize.define("Valves", {
    ID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    RecTime: {
      type: DataTypes.STRING(254),  // character varying(254)
      allowNull: true,
    },
    Latitude: {
      type: DataTypes.DOUBLE, // double precision
      allowNull: true,
    },
    Longitude: {
      type: DataTypes.DOUBLE, // double precision
      allowNull: true,
    },
    Elevation: {
      type: DataTypes.DOUBLE, // double precision
      allowNull: true,
    },
    Year: {
      type: DataTypes.DOUBLE, // double precision
      allowNull: true,
    },
    Route: {
      type: DataTypes.STRING(254), // character varying(254)
      allowNull: true,
    },
    Type: {
      type: DataTypes.STRING(254), // character varying(254)
      allowNull: true,
    },
    Diameter: {
      type: DataTypes.STRING(254), // character varying(254)
      allowNull: true,
    },
    Pipeline: {
      type: DataTypes.STRING(254), // character varying(254)
      allowNull: true,
    },
    Status: {
      type: DataTypes.STRING(254), // character varying(254)
      allowNull: true,
    },
    Picture: {
      type: DataTypes.STRING(254), // character varying(254)
      allowNull: true,
    },
    Name: {
      type: DataTypes.STRING(254), // character varying(254)
      allowNull: true,
    },
    Remarks: {
      type: DataTypes.STRING(254), // character varying(254)
      allowNull: true,
    },
    Fitting: {
      type: DataTypes.STRING(254), // character varying(254)
      allowNull: true,
    },
    Depth: {
      type: DataTypes.DOUBLE, // double precision
      allowNull: true,
    },
    geom: {
      type: DataTypes.GEOMETRY("POINT", 4326),
      allowNull: true,
    },
  }, {
    timestamps: true, // To enable createdAt and updatedAt fields
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  });

  return Valves;
};
