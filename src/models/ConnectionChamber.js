const Sequelize = require("sequelize");

module.exports = (sequelize, Datatypes) => {
  const ConnectionChamber = sequelize.define("ConnectionChamber", {
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
    Latitude: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    Longitude: {
      type: Sequelize.FLOAT,
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
    ChamberSize: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    YearOfInstallation: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    NoOfConnections: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    ManholeConnectedTo: {
      type: Sequelize.STRING,
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
    Status: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    Remarks: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    User: {
      type: Datatypes.STRING,
      allowNull: true,
    },
    Photo: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    geom: {
      type: Datatypes.GEOMETRY("POINTZM", 4326),
      allowNull: true,
    },
  });

  return ConnectionChamber;
};
