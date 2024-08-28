const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const CustomerChamber = sequelize.define("CustomerChamber", {
        ID: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        ObjectID: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        RecordTime: {
            type: Sequelize.STRING, // Updated to match SQL type 'character varying(254)'
            allowNull: true,
        },
        Latitude: {
            type: Sequelize.DOUBLE, // Updated to match SQL type 'double precision'
            allowNull: false,
        },
        Longitude: {
            type: Sequelize.DOUBLE, // Updated to match SQL type 'double precision'
            allowNull: false,
        },
        Elevation: {
            type: Sequelize.DOUBLE, // Updated to match SQL type 'double precision'
            allowNull: false,
        },
        OrthoHt: {
            type: Sequelize.DOUBLE, // Updated to match SQL type 'double precision'
            allowNull: true,
        },
        AccountNo: {
            type: Sequelize.DOUBLE, // Updated to match SQL type 'double precision'
            allowNull: true,
        },
        Chamber_1: {
            type: Sequelize.STRING, // Updated to match SQL type 'character varying(254)'
            allowNull: true,
        },
        Shape: {
            type: Sequelize.STRING, // Updated to match SQL type 'character varying(254)'
            allowNull: true,
        },
        ChamberDimension: {
            type: Sequelize.STRING, // Updated to match SQL type 'character varying(254)'
            allowNull: true,
        },
        Depth: {
            type: Sequelize.DOUBLE, // Updated to match SQL type 'double precision'
            allowNull: true,
        },
        Zone: {
            type: Sequelize.STRING, // Updated to match SQL type 'character varying(254)'
            allowNull: true,
        },
        YearOfConstruction: {
            type: Sequelize.DOUBLE, // Updated to match SQL type 'double precision'
            allowNull: true,
        },
        LineDiameter: {
            type: Sequelize.STRING, // Updated to match SQL type 'character varying(254)'
            allowNull: true,
        },
        Chamber_3: {
            type: Sequelize.STRING, // Updated to match SQL type 'character varying(254)'
            allowNull: true,
        },
        Connection: {
            type: Sequelize.STRING, // Updated to match SQL type 'character varying(254)'
            allowNull: true,
        },
        Infiltra_1: {
            type: Sequelize.STRING, // Updated to match SQL type 'character varying(254)'
            allowNull: true,
        },
        ChamberAccessibility: {
            type: Sequelize.STRING, // Updated to match SQL type 'character varying(254)'
            allowNull: true,
        },
        ChamberStatus: {
            type: Sequelize.STRING, // Updated to match SQL type 'character varying(254)'
            allowNull: true,
        },
        WaterSource: {
            type: Sequelize.STRING, // Updated to match SQL type 'character varying(254)'
            allowNull: true,
        },
        Billing: {
            type: Sequelize.STRING, // Updated to match SQL type 'character varying(254)'
            allowNull: true,
        },
        Category: {
            type: Sequelize.STRING, // Updated to match SQL type 'character varying(254)'
            allowNull: true,
        },
        No_Of_Units: {
            type: Sequelize.DOUBLE, // Updated to match SQL type 'double precision'
            allowNull: true,
        },
        Status: {
            type: Sequelize.STRING, // Updated to match SQL type 'character varying(254)'
            allowNull: true,
        },
        Remarks: {
            type: Sequelize.STRING, // Updated to match SQL type 'character varying(254)'
            allowNull: true,
        },
        Picture: {
            type: Sequelize.STRING, // Updated to match SQL type 'character varying(254)'
            allowNull: true,
        },
        Name: {
            type: Sequelize.STRING, // Updated to match SQL type 'character varying(254)'
            allowNull: true,
        },
        FolderPath: {
            type: Sequelize.STRING, // Updated to match SQL type 'character varying(254)'
            allowNull: true,
        },
        PopUpInfo: {
            type: Sequelize.STRING, // Updated to match SQL type 'character varying(254)'
            allowNull: true,
        },
        YearLaid: {
            type: Sequelize.DOUBLE, // Updated to match SQL type 'double precision'
            allowNull: true,
        },
        Size: {
            type: Sequelize.STRING, // Updated to match SQL type 'character varying(254)'
            allowNull: true,
        },
        PipeMaterial: {
            type: Sequelize.STRING, // Updated to match SQL type 'character varying(254)'
            allowNull: true,
        },
    }, {
        timestamps: true, // Includes 'createdAt' and 'updatedAt' fields
        createdAt: 'createdAt', // Matches SQL schema
        updatedAt: 'updatedAt', // Matches SQL schema
    });

    // Define the spatial data type, if applicable
    // sequelize.query('SELECT AddGeometryColumn(\'CustomerChamber\', \'geom\', 4326, \'POINTZM\', 2)')

    return CustomerChamber;
};
