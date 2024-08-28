const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const CustomerBilling = sequelize.define("CustomerBilling", {
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Amount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    CurrentBalance: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    PreviousBalance: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    CreatedDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    DueDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Account: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Zone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Scheme: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Route: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    MeterStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    AccountStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    MeterSize: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ParcelNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }); 

  return CustomerBilling;
};
