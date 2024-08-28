const Sequelize = require('sequelize');
const sequelize = require('../configs/connection');

module.exports = (sequelize, DataTypes) => {
    const TreatmentPlant = sequelize.define('TreatmentPlant', {
        ID: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        geom: {
            type: Sequelize.GEOMETRY('POLYGON', 4326), 
            allowNull: true,
        },
        Name: {
            type: DataTypes.STRING(254),
            allowNull: true,
        },
        Remarks: {
            type: DataTypes.STRING(254),
            allowNull: true,
        },
        RecordTime: {
            type: DataTypes.STRING(254), 
            allowNull: true,
        },
        Length: {
            type: DataTypes.DOUBLE, 
            allowNull: true,
        },
        Area: {
            type: DataTypes.DOUBLE, 
            allowNull: true,
        },
        Type: {
            type: DataTypes.STRING(254),
            allowNull: true,
        },
        Source: {
            type: DataTypes.STRING(254),
            allowNull: true,
        },
        Year_Ins_1: {
            type: DataTypes.DOUBLE, 
            allowNull: true,
        },
        Design_C_1: {
            type: DataTypes.DOUBLE, 
            allowNull: true,
        },
        Bulk_Meter_1: {
            type: DataTypes.STRING(254),
            allowNull: true,
        },
        Current_1: {
            type: DataTypes.STRING(254),
            allowNull: true,
        },
        Picture: {
            type: DataTypes.STRING(254),
            allowNull: true,
        },
        ShapeLength: {
            type: DataTypes.DOUBLE, 
            allowNull: true,
        },
        Shape_Area: {
            type: DataTypes.DOUBLE, 
            allowNull: true,
        },
    }, {
        timestamps: true, 
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    });

    return TreatmentPlant;
};
