const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const ConnectionChamber = require("../../models/ConnectionChamber")(
  sequelize,
  Sequelize
);

const Path = require("path");

ConnectionChamber.sync({ force: false });

exports.getAllConnectionChamber = (req, res) => {
    return new Promise(async (resolve, reject) => {
        ConnectionChamber.findAll().then(
            (result) => {
                resolve(result);
            },
            (error) => {
                reject({error: error})
            }
        )
    });
};