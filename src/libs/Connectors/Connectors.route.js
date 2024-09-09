const ConnectorsController = require("./Connectors.controller");
const verifyToken = require("../Auth/VerifyToken");

exports.ConnectorsRoutes = function (app) {
  app.post("/connectors/create", [ConnectorsController.create]);

  app.get("/connectors/paginated/:offset", [
    ConnectorsController.findConnectorsPagnited,
  ]);

  app.get("/connectors/searchone/:value", [
    ConnectorsController.searchOneConnectors,
  ]);

  app.get("/connectors/searchothers/:table/:value", [
    ConnectorsController.searchOthers,
  ]);

  app.get("/connectors/paginated/search/:column/:value/:offset", [
    ConnectorsController.findConnectorsPagnitedSearch,
  ]);

  app.get("/connectors/filter/:column/:operator/:value/:offset", [
    ConnectorsController.filterConnectors,
  ]);

  app.get("/connectors/geojson", [ConnectorsController.getGeoJSON]);

  app.get("/connectors/totalmapped", [ConnectorsController.totalMapped]);

  app.get("/connectors/all/stats", [ConnectorsController.getStats]);

  app.get("/connectors/all/charts", [ConnectorsController.findCharts]);


  app.get("/connectors/:ID", [ConnectorsController.findConnectorsById]);

  app.put("/connectors/:ID", [ConnectorsController.updateConnectorsById]);

  app.delete("/connectors/:ID", [ConnectorsController.deleteConnectorsById]);

  app.get("/connectors", [ConnectorsController.findAllConnectors]);
};
