const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const CustomerBilling = sequelize.define("CustomerBilling", {
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    OldAcc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Acc_No: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Zone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Sub_Zone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Estimate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Period: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Water: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    Sewer: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    Meter_No: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Tarrif: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Consumption: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    C_Date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    C_Read: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    P_Date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    P_Read: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    m_Total: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    Bill_No: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Due_Date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    B_Date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Con_P: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CuttOff: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mDesc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mAmount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    Arrears: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    Est: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sConsumption: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    MState: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    BAmount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    Printed: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    R_Date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }); 

  return CustomerBilling;
};
