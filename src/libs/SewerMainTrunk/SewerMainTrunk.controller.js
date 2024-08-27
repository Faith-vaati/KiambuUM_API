const SewerMainTrunkModel = require("./SewerMainTrunk.model");


exports.createSewerTrunk = (req, res) => {
    SewerMainTrunkModel.createSewerTrunk(req.body).then(
        (result) => {
            res.status(200).send(result);
        }, (err) => {
            res.status(203).send(err)
        }
    );
};

exports.getAllSewerMainTrunks = (req, res) => {
    SewerMainTrunkModel.getAllSewerMainTrunk().then(
        (result) => {
            res.status(200).send(result);
        },
        (error) => {
            res.status(500).send({ error: error.message || "An error occurred" });
        }
    );
};
