const NewWaterConnectionsController = require("./NewWaterConnections.controller");
exports.NewWaterConnectionsRoutes = function (app) {
  app.post("/water/create", [NewWaterConnectionsController.insert]);

  app.get("/water/paginated/:offset", [NewWaterConnectionsController.findNewWaterConnectionsPaginated]);

  app.get("/water/stats", [NewWaterConnectionsController.findStats]);

  app.get("/water/type/:type/:offset", [NewWaterConnectionsController.findByType]);

  app.get("/water/search/:query/:offset", [
    NewWaterConnectionsController.findByKeyword,
  ]);

  app.get("/water/year", [NewWaterConnectionsController.filterByYear]);

  app.delete("/water/:NewWaterConnectionID", [NewWaterConnectionsController.deleteNewWaterConnectionByID]);

  app.put("/water/:NewWaterConnectionID", [NewWaterConnectionsController.updateNewWaterConnectionByID]);

  app.get("/water/:NewWaterConnectionID", [NewWaterConnectionsController.findNewWaterConnectionByID]);

  app.get("/water", [NewWaterConnectionsController.findAllNewWaterConnections]);
};
