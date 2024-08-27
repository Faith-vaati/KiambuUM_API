const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const SewerMainTrunk = require("../../models/SewerMainTrunk")(
  sequelize,
  Sequelize
);

const Path = require("path");

SewerMainTrunk.sync({ force: false});

exports.getAllSewerMainTrunk = (req, res) => {
    return new Promise(async (resolve, reject) => {
        SewerMainTrunk.findAll().then(
            (result) => {
                resolve(result);
            },
            (error) => {
                reject({error: error})
            }
        )
    });
};