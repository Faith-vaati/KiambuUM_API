const MasterMetersController = require("./MasterMeter.controller");
const verifyToken = require("../Auth/VerifyToken");

exports.MasterMetersRoutes = function (app) {
  app.post("/mastermeters/create", [MasterMetersController.create]);

  app.get("/mastermeters/paginated/:offset", [
    MasterMetersController.findMasterMetersPagnited,
  ]);

  app.get("/mastermeters/totalmapped", [MasterMetersController.totalMapped]);

  app.get("/mastermeters/geojson", [MasterMetersController.getGeoJSON]);

  app.get("/mastermeters/paginated/search/:column/:value/:offset", [
    MasterMetersController.findMasterMetersPagnitedSearch,
  ]);

  app.get("/mastermeters/:ID", [MasterMetersController.findMasterMeterById]);

  app.get("/mastermeters/details/:value", [
    MasterMetersController.findMasterMeterByName,
  ]);

  app.put("/mastermeters/:id", [MasterMetersController.updateMasterMeterById]);

  app.get("/mastermeters", [MasterMetersController.findAllMasterMeters]);

  app.delete("/mastermeters/:ID", [
    MasterMetersController.deleteMasterMeterById,
  ]);
};
