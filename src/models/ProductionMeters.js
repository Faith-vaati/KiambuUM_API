const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const ProductionMeters = sequelize.define("ProductionMeters", {
        ID: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        Latitude: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        Longitude: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        Name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        AccountNumber: {
            type: Sequelize.STRING,
            allowNull: true
        },
        MeterSerial: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Type: {
            type: Sequelize.STRING,
            allowNull: true
        },
        YearOfInstallation: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Status: {
            type: Sequelize.STRING,
            allowNull: true
        },
        MeterSize: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Remarks: {
            type: Sequelize.STRING,
            allowNull: true
        },
        User: {
            type: Sequelize.STRING,
            allowNull: true,
          },
        Photo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        geom: {
            type: DataTypes.GEOMETRY("POINT", 4326),
            allowNull: true,
          },
        
    }, );

    return ProductionMeters;
};
