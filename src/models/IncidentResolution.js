const Sequelize = require("sequelize");
module.exports = (sequelize, Datatypes) => {
    const IncidentResolution = sequelize.define("IncidentResolution", {
        ID: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        NRWUserID: {
            type: Sequelize.UUID,
            allowNull: false
        },
        TaskImage: {
            type: Datatypes.TEXT,
            allowNull: true
        },
        ResolvedDate: {
            type: Datatypes.DATE,
            allowNull: true
        },
        ResolvedTime: {
            type: Datatypes.TIME,
            allowNull: true
        },
        Remark: { // description of the resolution
            type: Datatypes.STRING,
            allowNull: true
        },
        Status: {
            type: Datatypes.STRING,
            allowNull: true
        },
        ReportsID: {
            type: Sequelize.UUID,
            allowNull: false
        }
    });
    return IncidentResolution;
};