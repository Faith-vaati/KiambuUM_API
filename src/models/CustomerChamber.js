const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const CustomerChamber = sequelize.define("CustomerChamber", {
    ID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    AccountNo: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    Latitude: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    Longitude: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    Shape: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    Zone: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    Subzone: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    YearOfInstallation: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    PipeMaterial: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    PipeDiameter: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    Condition: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    WaterSource: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    Status: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    Size: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    Remarks: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    User: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Photo: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    geom: {
      type: Sequelize.GEOMETRY("POINT", 4326),
      allowNull: true,
    },
  });

  return CustomerChamber;
};
