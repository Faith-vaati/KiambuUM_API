const Sequelize = require("sequelize");
module.exports = (sequelize, Datatypes) => {
  const AssignedReports = sequelize.define("AssignedReports", {
    ID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    ReportID: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    NRWUserID: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    Image: {
      type: Datatypes.STRING,
      allowNull: true,
    },
    ResolvedDate: {
      type: Datatypes.STRING,
      allowNull: true,
    },
    ResolvedTime: {
      type: Datatypes.STRING,
      allowNull: true,
    },
    TaskDescription: {
      type: Datatypes.STRING,
      allowNull: true,
    },
  });
  return AssignedReports;
};
