const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const TreatmentPlant = require("../../models/TreatmentPlant")(
  sequelize,
  Sequelize
);

const Path = require("path");

TreatmentPlant.sync({ force: false});

exports.getAllTreatmentPlant = (req, res) => {
    return new Promise(async (resolve, reject) => {
        TreatmentPlant.findAll().then(
            (result) => {
                resolve(result);
            },
            (error) => {
                reject({error: error})
            }
        )
    });
};