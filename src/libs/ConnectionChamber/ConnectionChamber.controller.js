const ConnectionChamberModel = require("./ConnectionChamber.models");

exports.getAllConnectionChamberController = (req, res) => {
    ConnectionChamberModel.getAllConnectionChamber().then(
        (result) => {
            res.status(200).send(result);
        },
        (error) => {
            res.status(203).send(error);
        }
    );
};