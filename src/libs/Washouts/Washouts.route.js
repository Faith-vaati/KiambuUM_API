const WashoutsController = require("./Washouts.controller");
const verifyToken = require("../Auth/VerifyToken");

exports.WashoutsRoutes = function (app) {
  app.post("/washouts/create", [WashoutsController.create]);

  app.get("/washouts/paginated/:offset", [WashoutsController.findWashoutsPagnited]);

  app.get("/washouts/totalmapped", [WashoutsController.totalMapped]);

  app.get("/washouts/geojson", [WashoutsController.getGeoJSON]);

  app.get("/washouts/:ID", [WashoutsController.findWashoutById]);

  app.get("/washouts/details/:ID", [WashoutsController.findWashoutByObjectId]);

  app.put("/washouts/:id", [WashoutsController.updateWashoutById]);

  app.get("/washouts", [WashoutsController.findAllWashouts]);

  app.delete("/washouts/:ID", [WashoutsController.deleteWashoutById]);
};
