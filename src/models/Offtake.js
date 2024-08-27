const Sequelize = require('sequelize')
module.exports = (sequelize, Datatypes) => {
    const Offtake = sequelize.define("Offtake", {
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
            type: Sequelize.DATE,
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
            type: Sequelize.FLOAT,
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
      
    });
    return Offtake;
};
