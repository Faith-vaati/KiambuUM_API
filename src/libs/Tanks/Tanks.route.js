const TanksController = require("./Tanks.controller");
const verifyToken = require("../Auth/VerifyToken");

exports.TanksRoutes = function (app) {
  app.post("/tanks/create", [TanksController.create]);

  app.get("/tanks/paginated/:offset", [TanksController.findTanksPagnited]);

  app.get("/tanks/paginated/search/:column/:value/:offset", [
    TanksController.findTanksPagnitedSearch,
  ]);

  app.get("/tanks/geojson", [TanksController.getGeoJSON]);

  app.get("/tanks/totalmapped", [TanksController.totalMapped]);

  app.get("/tanks/:ID", [TanksController.findTankById]);

  app.get("/tanks/details/:value", [TanksController.findTankByName]);

  app.put("/tanks/:ID", [TanksController.updateTankById]);

  app.delete("/tanks/:ID", [TanksController.deleteTankById]);

  app.get("/tanks", [TanksController.findAllTanks]);
};
