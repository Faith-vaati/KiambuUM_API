const Sequelize = require('sequelize')
module.exports = (sequelize, Datatypes) => {
    const SewerMainTrunk = sequelize.define("SewerMainTrunk", {
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
        Name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Remarks: {
            type: Sequelize.STRING,
            allowNull: true
        },
        RecordTime: {
            type: Sequelize.DATE,
            allowNull: true
        },
       
        Length: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        TrunkName: {
            type: Sequelize.STRING,
            allowNull: true
        },
        PipeDiameter: {
            type: Sequelize.STRING,
            allowNull: true
        },
        PipeMaterial: {
            type: Sequelize.STRING,
            allowNull: true
        },
        PipeStatus: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Condition: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Intersec_1: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Outfall: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Current_1: {
            type: Sequelize.STRING,
            allowNull: true
        },
        YearLaid: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        Picture: {
            type: Sequelize.STRING,
            allowNull: true
        },
        ShapeLength: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
       
    });
    return SewerMainTrunk;
};
