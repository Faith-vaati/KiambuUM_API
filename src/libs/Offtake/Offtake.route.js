const OfftakeController = require("./Offtake.controller");

exports.OfftakeRoute = function (app) {
    app.get("/Offtake/getall", [OfftakeController.getAllOfftakeController]);
};