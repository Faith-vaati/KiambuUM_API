const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Manholes = sequelize.define("Manholes", {
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
    Latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    Longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    Elevation: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    OrthoHt: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    Manhole1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    LineType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    LineName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    LineDiameter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Depth: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    ConnectionType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Infiltration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Material: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Shape: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Installation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Accessibility: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Condition: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    WaterTight: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    LineMaterial: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    NoOfSt1: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    TypeOf1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    NumberO1: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    Intersection: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    YearConnected: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    Route: {
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
    YearLaid: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    Manhole: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    PipeDiameter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    PipeMaterial: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    geom: {
      type: DataTypes.GEOMETRY("POINT", 4326),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
  }, {
    tableName: 'Manholes',
    timestamps: true, // Ensure Sequelize handles createdAt and updatedAt automatically
  });

  return Manholes;
};
