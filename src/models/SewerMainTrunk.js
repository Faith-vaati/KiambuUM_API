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
      type: Sequelize.STRING,
      allowNull: true,
    },
    Remarks: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    RecTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Length: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    TrunkName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    PipeDiameter: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    PipeMaterial: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    PipeStatus: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    Condition: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    Intersection: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    Outfall: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    YearLaid: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    User: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    Photo: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    geom: {
      type: Sequelize.GEOMETRY("LINESTRING", 4326),
      allowNull: true,
    },
  });

  return SewerMainTrunk;
};
