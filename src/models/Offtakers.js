const Sequelize = require('sequelize');
module.exports = (sequelize, Datatypes) => {
    const Offtake = sequelize.define("Offtakers", {
        ID: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
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
        Year: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
    }, );

    return Offtake;
};
