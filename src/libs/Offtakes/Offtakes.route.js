const OfftakesController = require("./Offtakes.controller");
const verifyToken = require("../Auth/VerifyToken");

exports.OfftakesRoutes = function (app) {
  app.post("/offtakes/create", [OfftakesController.create]);

  app.get("/offtakes/paginated/:offset", [
    OfftakesController.findOfftakesPagnited,
  ]);

  app.get("/offtakes/searchone/:value", [
    OfftakesController.searchOneOfftakes,
  ]);

  app.get("/offtakes/searchothers/:table/:value", [
    OfftakesController.searchOthers,
  ]);

  app.get("/offtakes/paginated/search/:column/:value/:offset", [
    OfftakesController.findOfftakesPagnitedSearch,
  ]);

  app.get("/offtakes/filter/:column/:operator/:value/:offset", [
    OfftakesController.filterOfftakes,
  ]);

  app.get("/offtakes/geojson", [OfftakesController.getGeoJSON]);

  app.get("/offtakes/totalmapped", [OfftakesController.totalMapped]);

  app.get("/offtakes/all/stats", [OfftakesController.getStats]);

  app.get("/offtakes/all/charts", [OfftakesController.findCharts]);

  app.get("/offtakes/details/:value", [
    OfftakesController.findOfftakesByName,
  ]);

  app.get("/offtakes/:ID", [OfftakesController.findOfftakesById]);

  app.put("/offtakes/:ID", [OfftakesController.updateOfftakesById]);

  app.delete("/offtakes/:ID", [OfftakesController.deleteOfftakesById]);

  app.get("/offtakes", [OfftakesController.findAllOfftakes]);
};
