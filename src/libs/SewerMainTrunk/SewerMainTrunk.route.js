const SewerMainTrunkController = require("./SewerMainTrunk.controller");
const verifyToken = require("../Auth/VerifyToken");

exports.SewerMainTrunkRoutes = function (app) {
  app.post("/sewermaintrunk/create", [SewerMainTrunkController.create]);

  app.get("/sewermaintrunk/paginated/:offset", [
    SewerMainTrunkController.findSewerMainTrunkPagnited,
  ]);

  app.get("/sewermaintrunk/geojson", [SewerMainTrunkController.getGeoJSON]);

  app.get("/sewermaintrunk/totalmapped", [
    SewerMainTrunkController.totalMapped,
  ]);

  app.get("/sewermaintrunk/:ID", [
    SewerMainTrunkController.findSewerMainTrunkById,
  ]);

  app.get("/sewermaintrunk/details/:ID", [
    SewerMainTrunkController.findSewerMainTrunkByObjectId,
  ]);

  app.put("/sewermaintrunk/:ID", [
    SewerMainTrunkController.updateSewerMainTrunkById,
  ]);

  app.get("/sewermaintrunk", [SewerMainTrunkController.findAllSewerMainTrunk]);
};
