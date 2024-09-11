const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const BulkMeters = sequelize.define("BulkMeters", {
        ID: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        Remarks: {
            type: Sequelize.STRING,
            allowNull: true
        },
        RecTime: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Latitude: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        Longitude: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        Elevation: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        MeterNo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Type: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Year: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        WaterPipe: {
            type: Sequelize.STRING,
            allowNull: true
        },
        DMA: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Status: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Diameter: {
            type: Sequelize.STRING,
            allowNull: false
        },
        User: {
            type: DataTypes.STRING,
            allowNull: true,
          },
        Photo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        geom: {
            type: DataTypes.GEOMETRY("POINTZM", 4326),
            allowNull: true,
          },
        
    }, );

    return BulkMeters;
};
