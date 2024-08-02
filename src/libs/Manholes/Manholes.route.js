const ManholesController = require("./Manholes.controller");
const verifyToken = require("../Auth/VerifyToken");

exports.ManholeRoutes = function (app) {
  app.post("/manholes/create", [ManholesController.create]);

  app.get("/manholes/paginated/:offset", [
    ManholesController.findManholesPagnited,
  ]);

  app.get("/manholes/totalmapped", [ManholesController.totalMapped]);

  app.get("/manholes/geojson", [ManholesController.getGeoJSON]);

  app.get("/manholes/:ID", [ManholesController.findManholeById]);

  app.get("/manholes/details/:ID", [ManholesController.findManholeByObjectId]);

  app.put("/manholes/:id", [ManholesController.updateManholeById]);

  app.get("/manholes", [ManholesController.findAllManholes]);

  app.delete("/manholes/:ID", [ManholesController.deleteManholeById]);
};
