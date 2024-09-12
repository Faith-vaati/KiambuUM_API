const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

module.exports = (sequelize) => {
  const NewCustomerLineConnection = sequelize.define(
    "NewCustomerLineConnection",
    {
      ID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      LateralType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Diameter: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      PipeMaterial: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      OutfallingTrunk: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      YearLaid: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      Zone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Subzone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Remarks: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      User: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Photo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      geom: {
        type: DataTypes.GEOMETRY("LINESTRING", 4326),
        allowNull: true,
      },
    }
  );

  return NewCustomerLineConnection;
};
