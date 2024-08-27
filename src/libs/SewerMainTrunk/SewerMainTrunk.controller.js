const SewerMainTrunkModel = require("./SewerMainTrunk.model");

exports.getAllSewerMainTrunkController = (req, res) => {
    SewerMainTrunkModel.getAllSewerMainTrunk().then(
        (result) => {
            res.status(200).send(result);
        },
        (error) => {
            res.status(500).send({ error: error.message || "An error occurred" });
        }
    );
};
