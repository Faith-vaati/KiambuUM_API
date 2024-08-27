const ConnectionChamberController = require("./ConnectionChamber.controller");

exports.ConnectionChamberRoute = function (app) {
    app.get("/ConnectionChamber/getall", [ConnectionChamberController.getAllConnectionChamberController]);
};