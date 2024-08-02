const SewerlinesController = require("./Sewerlines.controller");
const verifyToken = require("../Auth/VerifyToken");

exports.SewerlinesRoutes = function (app) {
  app.post("/sewerlines/create", [SewerlinesController.create]);

  app.get("/sewerlines/paginated/:offset", [
    SewerlinesController.findSewerlinesPagnited,
  ]);

  app.get("/sewerlines/geojson", [SewerlinesController.getGeoJSON]);

  app.get("/sewerlines/totalmapped", [SewerlinesController.totalMapped]);

  app.get("/sewerlines/:ID", [SewerlinesController.findSewerlineById]);

  app.get("/sewerlines/details/:ID", [SewerlinesController.findSewerlineByObjectId]);

  app.put("/sewerlines/:ID", [SewerlinesController.updateSewerlineById]);

  app.get("/sewerlines", [SewerlinesController.findAllSewerlines]);
};
