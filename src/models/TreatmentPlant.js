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
        RecTime: {
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
        Year: {
            type: DataTypes.DOUBLE, 
            allowNull: true,
          },
       
        BulkMeter: {
            type: DataTypes.STRING(254),
            allowNull: true,
        },
        Design: {
            type: DataTypes.DOUBLE, 
            allowNull: true,
        },
        Route: {
            type: DataTypes.STRING,
            allowNull: true,
          },
       
        Picture: {
            type: DataTypes.STRING(254),
            allowNull: true,
        },
       
    },);

    return TreatmentPlant;
};
