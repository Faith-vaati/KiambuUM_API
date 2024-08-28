const CustomerChamberController = require("./CustomerChamber.controller");


exports.CustomerChamberRoute = function (app) {
    app.post("/CustomerChamber/create", CustomerChamberController.createCustomerChamber);

    app.put("/CustomerChamber/update/:id", CustomerChamberController.updateCustomerChamber);

    app.get("/CustomerChamber", CustomerChamberController.getAllCustomerChamberController); 

    app.delete("/CustomerChamber/delete/:id", CustomerChamberController.deleteCustomerChamber);
};
