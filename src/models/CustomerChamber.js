const Sequelize = require('sequelize')
module.exports = (sequelize, Datatypes) => {
    const CustomerChamber = sequelize.define("CustomerChamber", {
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
        OrthoHt: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        AccountNo: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        Chamber_1: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Shape: {
            type: Sequelize.STRING,
            allowNull: true
        },
        ChamberDimension: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Depth: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        Zone: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        YearOfConstruction: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        LineDiameter: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Chamber_3: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Connection: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Infiltra_1: {
            type: Sequelize.STRING,
            allowNull: true
        },
        ChamberAccessibility: {
            type: Sequelize.STRING,
            allowNull: true
        },
        ChamberStatus: {
            type: Sequelize.STRING,
            allowNull: true
        },
        WaterSource: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Billing: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Category: {
            type: Sequelize.STRING,
            allowNull: true
        },
        No_Of_Units: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        Status: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Remarks: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Picture: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        FolderPath: {
            type: Sequelize.STRING,
            allowNull: true
        },
        PopUpInfo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        YearLaid: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        Size: {
            type: Sequelize.STRING,
            allowNull: true
        },
        PipeMaterial: {
            type: Sequelize.STRING,
            allowNull: true
        },
    });
    return CustomerChamber;
};
