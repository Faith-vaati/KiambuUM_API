const ConnectionChamberController = require("./ConnectionChamber.controller");
const verifyToken = require("../Auth/VerifyToken");

exports.ConnectionChamberRoutes = function (app) {
  app.post("/connectionchamber/create", [ConnectionChamberController.create]);

  app.get("/connectionchamber/paginated/:offset", [
    ConnectionChamberController.findConnectionChamberPagnited,
  ]);

  app.get("/connectionchamber/searchone/:value", [
    ConnectionChamberController.searchOneConnectionChamber,
  ]);

  app.get("/connectionchamber/searchothers/:table/:value", [
    ConnectionChamberController.searchOthers,
  ]);

  app.get("/connectionchamber/paginated/search/:column/:value/:offset", [
    ConnectionChamberController.findConnectionChamberPagnitedSearch,
  ]);

  app.get("/connectionchamber/filter/:column/:operator/:value/:offset", [
    ConnectionChamberController.filterConnectionChamber,
  ]);

  app.get("/connectionchamber/geojson", [ConnectionChamberController.getGeoJSON]);

  app.get("/connectionchamber/totalmapped", [ConnectionChamberController.totalMapped]);

  app.get("/connectionchamber/all/stats", [ConnectionChamberController.getStats]);

  app.get("/connectionchamber/all/charts", [ConnectionChamberController.findCharts]);

  app.get("/connectionchamber/details/:Account", [
    ConnectionChamberController.findConnectionChamberByAccount,
  ]);

  app.get("/connectionchamber/:ID", [ConnectionChamberController.findConnectionChamberById]);

  app.put("/connectionchamber/:ID", [ConnectionChamberController.updateConnectionChamberById]);

  app.delete("/connectionchamber/:ID", [ConnectionChamberController.deleteConnectionChamberById]);

  app.get("/connectionchamber", [ConnectionChamberController.findAllConnectionChamber]);
};
