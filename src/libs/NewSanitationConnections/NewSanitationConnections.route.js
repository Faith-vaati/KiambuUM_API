const NewSanitationConnectionsController = require("./NewSanitationConnections.controller");
exports.NewSanitationConnectionsRoutes = function (app) {
  app.post("/sanitation/create", [NewSanitationConnectionsController.insert]);

  app.get("/sanitation/paginated/:offset", [
    NewSanitationConnectionsController.findNewSanitationConnectionsPaginated,
  ]);

  app.get("/sanitation/stats", [NewSanitationConnectionsController.findStats]);

  app.get("/sanitation/type/:type/:offset", [
    NewSanitationConnectionsController.findByType,
  ]);

  app.get("/sanitation/search/:query/:offset", [
    NewSanitationConnectionsController.findByKeyword,
  ]);

  app.get("/sanitation/year", [
    NewSanitationConnectionsController.filterByYear,
  ]);

  app.delete("/sanitation/:NewSanitationConnectionID", [
    NewSanitationConnectionsController.deleteNewSanitationConnectionByID,
  ]);

  app.put("/sanitation/:NewSanitationConnectionID", [
    NewSanitationConnectionsController.updateNewSanitationConnectionByID,
  ]);

  app.get("/sanitation/:NewSanitationConnectionID", [
    NewSanitationConnectionsController.findNewSanitationConnectionByID,
  ]);

  app.get("/sanitation", [
    NewSanitationConnectionsController.findAllNewSanitationConnections,
  ]);
};
