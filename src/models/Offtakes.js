const Sequelize = require("sequelize");
module.exports = (sequelize, Datatypes) => {
  const Offtakes = sequelize.define("Offtakes", {
    ID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Latitude: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    Longitude: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    BrandName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    Diameter: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    MeterSerial: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    MeterType: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    AccountName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    AccountNumber: {
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
    Status: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    YearOfInstallation: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    User: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    Remarks: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    Photo: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    geom: {
      type: Datatypes.GEOMETRY('POINT', 4326),
      allowNull: true,
    },
  });

  return Offtakes;
};
