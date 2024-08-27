const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const SewerMainTrunk = require("../../models/SewerMainTrunk")(
  sequelize,
  Sequelize
);

const Path = require("path");

SewerMainTrunk.sync({ force: false});

exports.createSewerTrunk = (SewerTrunkData) => {
    return new Promise(async (resolve, reject) => {
        if (SewerTrunkData.ObjectID === undefined) {
            reject({Error: "Body is required!"});
        }
        SewerMainTrunk.create(SewerTrunkData).then(
            (result) => {
                resolve({sucess: "Sewer trunk created successfully"});
            },
            (error) => {
                console.log(error);
                reject({error: "Creation failed"})                
            }
        )
    });
};

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