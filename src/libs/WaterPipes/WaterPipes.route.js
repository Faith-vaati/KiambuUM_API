const WaterPipesController = require("./WaterPipes.controller");
const verifyToken = require("../Auth/VerifyToken");

exports.WaterPipesRoutes = function (app) {
  app.post("/waterpipes/create", [WaterPipesController.create]);

  app.get("/waterpipes/paginated/:offset", [
    WaterPipesController.findWaterPipesPagnited,
  ]);

  app.get("/waterpipes/geojson", [WaterPipesController.getGeoJSON]);

  app.get("/waterpipes/totalmapped", [WaterPipesController.totalMapped]);

  app.get("/waterpipes/:ID", [WaterPipesController.findWaterPipeById]);

  app.get("/waterpipes/details/:ID", [
    WaterPipesController.findWaterPipeByObjectId,
  ]);

  app.put("/waterpipes/:ID", [WaterPipesController.updateWaterPipeById]);

  app.delete("/waterpipes/:ID", [WaterPipesController.deleteWaterPipeById]);

  app.get("/waterpipes", [WaterPipesController.findAllWaterPipes]);
};
