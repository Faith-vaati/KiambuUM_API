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
            type: Sequelize.STRING, 
            allowNull: true
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
            allowNull: true
        },
        Name: {
            type: Sequelize.STRING, 
            allowNull: true
        },
        Diameter: {
            type: Sequelize.STRING, 
            allowNull: true
        },
        Year_in_1: {
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
        geom: {
            type: Sequelize.GEOMETRY('POINT'), 
            allowNull: true
        },
        Remarks: {
            type: Sequelize.STRING, 
            allowNull: true
        },
        RecTime: {
            type: Sequelize.STRING, 
            allowNull: true
        },
    }, {
        timestamps: true, 
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    });

    return Offtake;
};
