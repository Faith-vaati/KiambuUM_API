const BulkMetersController = require("./BulkMeters.controller");
const verifyToken = require("../Auth/VerifyToken");

exports.BulkMetersRoutes = function (app) {
  app.post("/bulkmeters/create", [BulkMetersController.create]);

  app.get("/bulkmeters/paginated/:offset", [
    BulkMetersController.findBulkMetersPagnited,
  ]);

  app.get("/bulkmeters/searchone/:value", [
    BulkMetersController.searchOneBulkMeters,
  ]);

  app.get("/bulkmeters/searchothers/:table/:value", [
    BulkMetersController.searchOthers,
  ]);

  app.get("/bulkmeters/paginated/search/:column/:value/:offset", [
    BulkMetersController.findBulkMetersPagnitedSearch,
  ]);

  app.get("/bulkmeters/filter/:column/:operator/:value/:offset", [
    BulkMetersController.filterBulkMeters,
  ]);

  app.get("/bulkmeters/geojson", [BulkMetersController.getGeoJSON]);

  app.get("/bulkmeters/totalmapped", [BulkMetersController.totalMapped]);

  app.get("/bulkmeters/all/stats", [BulkMetersController.getStats]);

  app.get("/bulkmeters/all/charts", [BulkMetersController.findCharts]);

  app.get("/bulkmeters/details/:meterno", [
    BulkMetersController.findBulkMetersByMeterNo,
  ]);

  app.get("/bulkmeters/:ID", [BulkMetersController.findBulkMetersById]);

  app.put("/bulkmeters/:ID", [BulkMetersController.updateBulkMetersById]);

  app.delete("/bulkmeters/:ID", [BulkMetersController.deleteBulkMetersById]);

  app.get("/bulkmeters", [BulkMetersController.findAllBulkMeters]);
};
