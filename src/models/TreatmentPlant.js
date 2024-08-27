const Sequelize = require("sequelize");
const sequelize = require("../configs/connection");
module.exports = (sequelize, DataTypes) => {
    const TreatmentPlant = sequelize.define("TreatmentPlant", {
        ID: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        ObjectID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Remarks: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        RecordTime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        Length: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        Area: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        Type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Source: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Year_Ins_1: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Design_C_1: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Bulk_Meter_1: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Current_1: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Picture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ShapeLength: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        Shape_Area: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
    });
    return TreatmentPlant;
};
