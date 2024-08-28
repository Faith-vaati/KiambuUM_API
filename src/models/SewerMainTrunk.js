const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const SewerMainTrunk = sequelize.define("SewerMainTrunk", {
        ID: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        Name: {
            type: Sequelize.STRING(254),
            allowNull: true
        },
        Remarks: {
            type: Sequelize.STRING(254),
            allowNull: true
        },
        RecordTime: {
            type: Sequelize.STRING(254), // This is a character varying in the SQL schema
            allowNull: true
        },
        Length: {
            type: Sequelize.FLOAT, // Matches the double precision type in SQL
            allowNull: true
        },
        TrunkName: {
            type: Sequelize.STRING(254),
            allowNull: true
        },
        PipeDiameter: {
            type: Sequelize.STRING(254),
            allowNull: true
        },
        PipeMaterial: {
            type: Sequelize.STRING(254),
            allowNull: true
        },
        PipeStatus: {
            type: Sequelize.STRING(254), // Corrected typo from PipeStastus to PipeStatus
            allowNull: true
        },
        Condition: {
            type: Sequelize.STRING(254),
            allowNull: true
        },
        Intersec_1: {
            type: Sequelize.STRING(254), // Renamed to match SQL schema
            allowNull: true
        },
        Outfall: {
            type: Sequelize.STRING(254),
            allowNull: true
        },
        Current_1: {
            type: Sequelize.STRING(254),
            allowNull: true
        },
        YearLaid: {
            type: Sequelize.FLOAT, // Matches double precision type in SQL
            allowNull: true
        },
        Picture: {
            type: Sequelize.STRING(254),
            allowNull: true
        },
        ShapeLength: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        geom: { // Adding the geometry field
            type: Sequelize.GEOMETRY('LINESTRING', 4326), // Assuming you're using PostgreSQL with PostGIS
            allowNull: true
        }
    }, {
        tableName: 'SewerMainTrunk', // Make sure this matches your SQL table name
        timestamps: true, // Assuming you're using createdAt and updatedAt
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    });

    return SewerMainTrunk;
};
