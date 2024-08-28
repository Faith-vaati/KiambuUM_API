const BulkMetersController = require("./BulkMeters.controller");


exports.BulkMetersRoute = function (app) {
    app.post("/BulkMeters/create", BulkMetersController.createBulkMeters);

    app.put("/BulkMeters/update/:id", BulkMetersController.updateBulkMeters);

    app.get("/BulkMeters", BulkMetersController.getAllBulkMetersController); 

    app.delete("/BulkMeters/delete/:id", BulkMetersController.deleteBulkMeters);
};
