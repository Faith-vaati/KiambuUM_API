const TreatmentPlantController = require("./TreatmentPlant.controller");

exports.TreatmentPlantRoute = function (app) {
    app.get("/TreatmentPlant/getall", [TreatmentPlantController.getAllTreatmentPlantController]);
};