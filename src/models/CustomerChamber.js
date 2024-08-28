const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const CustomerChamber = sequelize.define("CustomerChamber", {
        ID: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        geom: {
            type: Sequelize.GEOMETRY('POINTZM', 4326),
            allowNull: true,
        },
        Remarks: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        RecTime: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        Latitude: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        Longitude: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        Elevation: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        OrthoHt: {
            type: Sequelize.DOUBLE,
            allowNull: true,
        },
        Account1: {
            type: Sequelize.DOUBLE,
            allowNull: true,
        },
        Chamber1: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        Type: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        Dimensions: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        Depth: {
            type: Sequelize.DOUBLE,
            allowNull: true,
        },
        Zone: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        Year: {
            type: Sequelize.DOUBLE,
            allowNull: true,
        },
        LineDiameter: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        Installation: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        ConnectionType: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        Infiltration: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        Accessibility: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        Condition: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        WaterSource: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        Billing: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        Category: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        NoOfUnits: {
            type: Sequelize.DOUBLE,
            allowNull: true,
        },
        Subzone: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        Addition1: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        Status: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        Picture: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        Name: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        Chamber: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        Size: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        PipeMaterial: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
    }, {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    });

    return CustomerChamber;
};
