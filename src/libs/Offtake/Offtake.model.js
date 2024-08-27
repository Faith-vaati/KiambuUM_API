const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const Offtake = require("../../models/Offtake")(
  sequelize,
  Sequelize
);

const Path = require("path");

Offtake.sync({ force: false });

exports.getAllOfftake = (req, res) => {
    return new Promise(async (resolve, reject) => {
        Offtake.findAll().then(
            (result) => {
                resolve(result);
            },
            (error) => {
                reject({error: error})
            }
        )
    });
};