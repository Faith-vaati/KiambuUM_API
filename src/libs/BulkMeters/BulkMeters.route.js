const BulkMetersController = require("./BulkMeters.controller");

exports.BulkMetersRoute = function (app) {
    app.get("/bulkmeters/getall", [BulkMetersController.getAllBulkMetersController]);
};