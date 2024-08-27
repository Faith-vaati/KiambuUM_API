const CustomerChamberController = require("./CustomerChamber.controller");

exports.CustomerChamberRoute = function (app) {
    app.get("/CustomerChamber/getall", [CustomerChamberController.getAllCustomerChamberController]);
};