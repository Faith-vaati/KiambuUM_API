const TreatmentPlantModel = require("./TreatmentPlant.model");

exports.getAllTreatmentPlantController = (req, res) => {
    TreatmentPlantModel.getAllTreatmentPlant().then(
        (result) => {
            res.status(200).send(result);
        },
        (error) => {
            res.status(500).send({ error: error.message || "An error occurred" });
        }
    );
};


