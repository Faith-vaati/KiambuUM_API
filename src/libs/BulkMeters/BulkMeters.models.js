const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const BulkMeters = require("../../models/BulkMeters")(
  sequelize,
  Sequelize
);

const Path = require("path");

BulkMeters.sync({ force: false });

exports.getAllBulkMeters = (req, res) => {
    return new Promise(async (resolve, reject) => {
        BulkMeters.findAll().then(
            (result) => {
                resolve(result);
            },
            (error) => {
                reject({error: error})
            }
        )
    });
};