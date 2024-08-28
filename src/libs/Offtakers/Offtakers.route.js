const OfftakersController = require("./Offtakers.controller");
const verifyToken = require("../Auth/VerifyToken");

exports.OfftakersRoutes = function (app) {
  app.post("/offtakers/create", [OfftakersController.create]);

  app.get("/offtakers/paginated/:offset", [
    OfftakersController.findOfftakersPagnited,
  ]);

  app.get("/offtakers/searchone/:value", [
    OfftakersController.searchOneOfftakers,
  ]);

  app.get("/offtakers/searchothers/:table/:value", [
    OfftakersController.searchOthers,
  ]);

  app.get("/offtakers/paginated/search/:column/:value/:offset", [
    OfftakersController.findOfftakersPagnitedSearch,
  ]);

  app.get("/offtakers/filter/:column/:operator/:value/:offset", [
    OfftakersController.filterOfftakers,
  ]);

  app.get("/offtakers/geojson", [OfftakersController.getGeoJSON]);

  app.get("/offtakers/totalmapped", [OfftakersController.totalMapped]);

  app.get("/offtakers/all/stats", [OfftakersController.getStats]);

  app.get("/offtakers/all/charts", [OfftakersController.findCharts]);

  app.get("/offtakers/details/:Account", [
    OfftakersController.findOfftakersByAccount,
  ]);

  app.get("/offtakers/:ID", [OfftakersController.findOfftakersById]);

  app.put("/offtakers/:ID", [OfftakersController.updateOfftakersById]);

  app.delete("/offtakers/:ID", [OfftakersController.deleteOfftakersById]);

  app.get("/offtakers", [OfftakersController.findAllOfftakers]);
};
