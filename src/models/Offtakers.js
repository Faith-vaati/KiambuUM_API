const Sequelize = require("sequelize");
module.exports = (sequelize, Datatypes) => {
  const Offtake = sequelize.define("Offtakers", {
    ID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Latitude: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    Longitude: {
      type: Sequelize.DOUBLE,
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
    Photo: {
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
    geom: {
      type: Sequelize.GEOMETRY("POINT"),
      allowNull: true,
    },
    Remarks: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    Zone: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    Status: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    YearOfInstallation: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
  });

  return Offtake;
};
