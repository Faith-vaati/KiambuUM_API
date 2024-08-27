const ConnectionChamberController = require("./ConnectionChamber.controller");


exports.ConnectionChamberRoute = function (app) {
    app.post("/ConnectionChamber/create", ConnectionChamberController.createConnectionChamber);

    app.put("/ConnectionChamber/update/:id", ConnectionChamberController.updateConnectionChamber);

    app.get("/ConnectionChamber", ConnectionChamberController.getAllConnectionChamberController); 

    app.delete("/ConnectionChamber/delete/:id", ConnectionChamberController.deleteConnectionChamber);
};
