const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = (sequelize) => {
  const SewerLines = sequelize.define('SewerLines', {
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    geom: {
      type: DataTypes.GEOMETRY('LineStringZ', 4326),
      allowNull: true,
    },
    Name: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    RecTime: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    Length: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    Lateral: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    Type: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    LineDiameter: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    PipeMaterial: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    PipeStatus: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    Condition: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    Intersection: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    Outfall: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    YearLaid: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    Remarks: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    Picture: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    PipeName: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    PipeDia1: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    Route: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    Diameter: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    Status: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    Zone: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    TrunkName: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
  }, {
    timestamps: true, // Enable automatic createdAt and updatedAt management
    createdAt: 'createdAt', // Explicitly naming the fields
    updatedAt: 'updatedAt', // Explicitly naming the fields
  });

  return SewerLines;
};
