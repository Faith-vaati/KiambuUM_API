const Sequelize = require('sequelize')
module.exports = (sequelize, Datatypes) => {
    const BulkMeters = sequelize.define("BulkMeters", {
        ID: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        ObjectID: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Remarks: {
            type: Sequelize.STRING,
            allowNull: true
        },
        RecordTime: {
            type: Sequelize.DATE,
            allowNull: false
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
            type: Sequelize.STRING,
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
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Current: {
            type: Sequelize.STRING,
            allowNull: true
        },
        DMA: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Picture: {
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
    });
    return BulkMeters;
};
