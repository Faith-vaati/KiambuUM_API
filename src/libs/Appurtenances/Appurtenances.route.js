const AppurtenancesController = require("./Appurtenances.controller");
const verifyToken = require("../Auth/VerifyToken");

exports.AppurtenancesRoutes = function (app) {
  app.post("/appurtenances/create", [AppurtenancesController.create]);

  app.get("/appurtenances/paginated/:offset", [
    AppurtenancesController.findAppurtenancesPagnited,
  ]);

  app.get("/appurtenances/searchone/:value", [
    AppurtenancesController.searchOneAppurtenances,
  ]);

  app.get("/appurtenances/searchothers/:table/:value", [
    AppurtenancesController.searchOthers,
  ]);

  app.get("/appurtenances/paginated/search/:column/:value/:offset", [
    AppurtenancesController.findAppurtenancesPagnitedSearch,
  ]);

  app.get("/appurtenances/filter/:column/:operator/:value/:offset", [
    AppurtenancesController.filterAppurtenances,
  ]);

  app.get("/appurtenances/geojson", [AppurtenancesController.getGeoJSON]);

  app.get("/appurtenances/totalmapped", [AppurtenancesController.totalMapped]);

  app.get("/appurtenances/all/stats", [AppurtenancesController.getStats]);

  app.get("/appurtenances/all/charts", [AppurtenancesController.findCharts]);


  app.get("/appurtenances/:ID", [AppurtenancesController.findAppurtenancesById]);

  app.put("/appurtenances/:ID", [AppurtenancesController.updateAppurtenancesById]);

  app.delete("/appurtenances/:ID", [AppurtenancesController.deleteAppurtenancesById]);

  app.get("/appurtenances", [AppurtenancesController.findAllAppurtenances]);
};
