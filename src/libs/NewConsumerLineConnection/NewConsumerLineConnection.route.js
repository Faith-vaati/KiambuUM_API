const ConsumerLineController = require("./NewConsumerLineConnection.controller");
const verifyToken = require("../Auth/VerifyToken");

exports.ConsumerLineRoutes = function (app) {
  app.post("/consumerline/create", [ConsumerLineController.create]);

  app.get("/consumerline/paginated/:offset", [
    ConsumerLineController.findConsumerLinesPaginated,
  ]);

  app.get("/consumerline/geojson", [ConsumerLineController.getGeoJSON]);

  app.get("/consumerline/totalmapped", [ConsumerLineController.totalMapped]);

  app.get("/consumerline/:ID", [ConsumerLineController.findConsumerLineById]);

  app.get("/consumerline/details/:value", [
    ConsumerLineController.findConsumerLineByName,
  ]);

  app.put("/consumerline/:ID", [ConsumerLineController.updateConsumerLineById]);

  app.delete("/consumerline/:ID", [
    ConsumerLineController.deleteConsumerLineById,
  ]);

  app.get("/consumerline", [ConsumerLineController.findAllConsumerLines]);
};
