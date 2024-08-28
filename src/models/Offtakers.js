const Sequelize = require('sequelize');
module.exports = (sequelize, Datatypes) => {
    const Offtake = sequelize.define("Offtakers", {
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
        RecordTime: {
            type: Sequelize.STRING, // Changing to STRING to match SQL schema's character varying
            allowNull: true
        },
        Latitude: {
            type: Sequelize.DOUBLE, // Changing to DOUBLE to match SQL schema's double precision
            allowNull: false
        },
        Longitude: {
            type: Sequelize.DOUBLE, // Changing to DOUBLE to match SQL schema's double precision
            allowNull: false
        },
        Elevation: {
            type: Sequelize.DOUBLE, // Changing to DOUBLE to match SQL schema's double precision
            allowNull: true
        },
        Name: {
            type: Sequelize.STRING, // Adjusted length to match SQL schema's character varying(254)
            allowNull: true
        },
        Diameter: {
            type: Sequelize.STRING, // Adjusted length to match SQL schema's character varying(254)
            allowNull: true
        },
        Year_in_1: {
            type: Sequelize.STRING, // Changing to STRING to match SQL schema's character varying
            allowNull: true
        },
        Picture: {
            type: Sequelize.STRING, // Adjusted length to match SQL schema's character varying(254)
            allowNull: true
        },
        Status: {
            type: Sequelize.STRING, // Adjusted length to match SQL schema's character varying(254)
            allowNull: true
        },
        geom: {
            type: Sequelize.GEOMETRY('POINT'), // Adding geom field with geometry type
            allowNull: true
        },
        Remarks: {
            type: Sequelize.STRING, // Adding Remarks field
            allowNull: true
        },
        RecTime: {
            type: Sequelize.STRING, // Adding RecTime field
            allowNull: true
        },
    }, {
        timestamps: true, // Adding timestamps for createdAt and updatedAt
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    });

    return Offtake;
};
