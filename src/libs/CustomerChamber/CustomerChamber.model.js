const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const CustomerChamber = require("../../models/CustomerChamber")(
  sequelize,
  Sequelize
);

const Path = require("path");

CustomerChamber.sync({ force: false });

exports.getAllCustomerChamber = (req, res) => {
    return new Promise(async (resolve, reject) => {
        CustomerChamber.findAll().then(
            (result) => {
                resolve(result);
            },
            (error) => {
                reject({error: error})
            }
        )
    });
};