const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const NRWLeakages = sequelize.define("NRWLeakages", {
    ID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    SerialNo: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    DMAName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Nature: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    DateReported: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ReportedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    AssignedTo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    DateResolved: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Longitude: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    Latitude: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    geom: {
      type: DataTypes.GEOMETRY("POINT", 4326),
      allowNull: true,
    },
  });
  return NRWLeakages;
};
