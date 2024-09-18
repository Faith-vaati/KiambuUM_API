const ProductionMetersController = require("./ProductionMeters.controller");
const verifyToken = require("../Auth/VerifyToken");

exports.ProductionMetersRoutes = function (app) {
  app.post("/productionmeters/create", [ProductionMetersController.create]);

  app.get("/productionmeters/paginated/:offset", [
    ProductionMetersController.findProductionMetersPagnited,
  ]);

  app.get("/productionmeters/searchone/:value", [
    ProductionMetersController.searchOneProductionMeters,
  ]);

  app.get("/productionmeters/searchothers/:table/:value", [
    ProductionMetersController.searchOthers,
  ]);

  app.get("/productionmeters/paginated/search/:column/:value/:offset", [
    ProductionMetersController.findProductionMetersPagnitedSearch,
  ]);

  app.get("/productionmeters/filter/:column/:operator/:value/:offset", [
    ProductionMetersController.filterProductionMeters,
  ]);

  app.get("/productionmeters/geojson", [ProductionMetersController.getGeoJSON]);

  app.get("/productionmeters/totalmapped", [ProductionMetersController.totalMapped]);

  app.get("/productionmeters/all/stats", [ProductionMetersController.getStats]);

  app.get("/productionmeters/all/charts", [ProductionMetersController.findCharts]);

  app.get("/productionmeters/details/:meterno", [
    ProductionMetersController.findProductionMetersByMeterNo,
  ]);

  app.get("/productionmeters/:ID", [ProductionMetersController.findProductionMetersById]);

  app.put("/productionmeters/:ID", [ProductionMetersController.updateProductionMetersById]);

  app.delete("/productionmeters/:ID", [ProductionMetersController.deleteProductionMetersById]);

  app.get("/productionmeters", [ProductionMetersController.findAllProductionMeters]);
};
