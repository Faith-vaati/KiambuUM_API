const Sequelize = require('sequelize')
module.exports = (sequelize, Datatypes) => {
    const ConnectionChamber = sequelize.define("ConnectionChamber", {
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
            type: Sequelize.STRING,
            allowNull: false
        },
        Chamber: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        ChamberDimension: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Depth: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        No_of_Co_1: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        Status: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Zone: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        Lateral: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Manhole_1: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        LineDiameter: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Connection: {
            type: Sequelize.STRING,
            allowNull: true
        },
        ChamberAccessibility: {
            type: Sequelize.STRING,
            allowNull: true
        },
        ChamberCondition: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Chamber_5: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Inflitra_1: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Subzone: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Picture: {
            type: Sequelize.STRING,
            allowNull: true
        },
    });
    return ConnectionChamber;
};
