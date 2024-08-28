const Sequelize = require('sequelize');

module.exports = (sequelize, Datatypes) => {
    const ConnectionChamber = sequelize.define("ConnectionChamber", {
        ID: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        Name: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        RecTime: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        Latitude: {
            type: Sequelize.DOUBLE,
            allowNull: true,
        },
        Longitude: {
            type: Sequelize.DOUBLE,
            allowNull: true,
        },
        Elevation: {
            type: Sequelize.DOUBLE,
            allowNull: true,
        },
        OrthoHt: {
            type: Sequelize.DOUBLE,
            allowNull: true,
        },
        Chamber1: {
            type: Sequelize.DOUBLE,
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
        NoOfConnections: {
            type: Sequelize.DOUBLE,
            allowNull: true,
        },
        Status: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        Zone: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        YearConnection: {
            type: Sequelize.DOUBLE,
            allowNull: true,
        },
        Lateral: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        Manhole: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        LineDiameter: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        ConnectionType: {
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
        Installation: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        Inflitration: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        Subzone: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        Remarks: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        Picture: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        Year: {
            type: Sequelize.DOUBLE,
            allowNull: true,
        },
        Chamber: {
            type: Sequelize.STRING(254),
            allowNull: true,
        },
        Type: {
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
        tableName: 'ConnectionChambers',
        timestamps: true,
    });

    return ConnectionChamber;
};
