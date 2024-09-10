const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const NewWaterConnections = sequelize.define("NewWaterConnections", {
    ID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Longitude: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    Latitude: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Zone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Categorisation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    geom: {
      type: DataTypes.GEOMETRY("POINT", 4326),
      allowNull: true,
    },
  });
  return NewWaterConnections;
};
