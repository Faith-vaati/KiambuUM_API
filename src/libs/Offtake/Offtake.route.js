const OfftakeController = require("./Offtake.controller");
// console.log("OfftakeController:", OfftakeController);


exports.OfftakeRoute = function (app) {
    app.post("/Offtake/create", OfftakeController.createOfftake);

    app.put("/offtake/update/:id", OfftakeController.updateOfftake);

    app.get("/Offtake", OfftakeController.getAllOfftakeController); 

    app.delete("/offtake/delete/:id", OfftakeController.deleteOfftake);
};
