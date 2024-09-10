const BoreholesController = require("./Boreholes.controller");
const verifyToken = require("../Auth/VerifyToken");

exports.BoreholesRoutes = function (app) {
  app.post("/boreholes/create", [BoreholesController.create]);

  app.get("/boreholes/paginated/:offset", [
    BoreholesController.findBoreholesPagnited,
  ]);

  app.get("/boreholes/searchone/:value", [
    BoreholesController.searchOneBoreholes,
  ]);

  app.get("/boreholes/searchothers/:table/:value", [
    BoreholesController.searchOthers,
  ]);

  app.get("/boreholes/paginated/search/:column/:value/:offset", [
    BoreholesController.findBoreholesPagnitedSearch,
  ]);

  app.get("/boreholes/filter/:column/:operator/:value/:offset", [
    BoreholesController.filterBoreholes,
  ]);

  app.get("/boreholes/geojson", [BoreholesController.getGeoJSON]);

  app.get("/boreholes/totalmapped", [BoreholesController.totalMapped]);

  app.get("/boreholes/all/stats", [BoreholesController.getStats]);

  app.get("/boreholes/all/charts", [BoreholesController.findCharts]);


  app.get("/boreholes/:ID", [BoreholesController.findBoreholesById]);

  app.put("/boreholes/:ID", [BoreholesController.updateBoreholesById]);

  app.delete("/boreholes/:ID", [BoreholesController.deleteBoreholesById]);

  app.get("/boreholes", [BoreholesController.findAllBoreholes]);
};
