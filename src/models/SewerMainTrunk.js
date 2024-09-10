const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const SewerMainTrunk = sequelize.define("SewerMainTrunk", {
    ID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Name: {
      type: Sequelize.STRING(254),
      allowNull: true,
    },
    Remarks: {
      type: Sequelize.STRING(254),
      allowNull: true,
    },

    RecTime: {
      type: DataTypes.STRING(254),
      allowNull: true,
    },
    Length: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    TrunkName: {
      type: Sequelize.STRING(254),
      allowNull: true,
    },
    PipeDiameter: {
      type: Sequelize.STRING(254),
      allowNull: true,
    },
    PipeMaterial: {
      type: Sequelize.STRING(254),
      allowNull: true,
    },
    PipeStatus: {
      type: Sequelize.STRING(254),
      allowNull: true,
    },
    Condition: {
      type: Sequelize.STRING(254),
      allowNull: true,
    },
    Intersection: {
      type: Sequelize.STRING(254),
      allowNull: true,
    },
    Outfall: {
      type: Sequelize.STRING(254),
      allowNull: true,
    },

    YearLaid: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    Picture: {
      type: Sequelize.STRING(254),
      allowNull: true,
    },

    geom: {
      type: Sequelize.GEOMETRY("LINESTRING", 4326),
      allowNull: true,
    },
  });

  return SewerMainTrunk;
};
