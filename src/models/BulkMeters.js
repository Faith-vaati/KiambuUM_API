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
            type: Sequelize.STRING(254),
            allowNull: true
        },
        RecTime: {
            type: Sequelize.STRING(254),
            allowNull: false
        },
        Latitude: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        Longitude: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        Elevation: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        MeterNo: {
            type: Sequelize.STRING(254),
            allowNull: true
        },
        Type: {
            type: Sequelize.STRING(254),
            allowNull: true
        },
        Year: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        WaterPipe: {
            type: Sequelize.STRING(254),
            allowNull: true
        },
        DMA: {
            type: Sequelize.STRING(254),
            allowNull: true
        },
        Picture: {
            type: Sequelize.STRING(254),
            allowNull: true
        },
        Status: {
            type: Sequelize.STRING(254),
            allowNull: true
        },
        Diameter: {
            type: Sequelize.STRING(254),
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        }
    }, {
        tableName: 'BulkMeters',
        timestamps: true,  // This enables createdAt and updatedAt fields
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    });

    return BulkMeters;
};
