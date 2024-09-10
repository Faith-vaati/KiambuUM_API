const ValvesController = require("./Valves.controller");
const verifyToken = require("../Auth/VerifyToken");

exports.ValvesRoutes = function (app) {
  app.post("/valves/create", [ValvesController.create]);

  app.get("/valves/paginated/:offset", [
    ValvesController.findValvesPagnited,
  ]);

  app.get("/valves/paginated/search/:value/:offset", [
    ValvesController.findValvesPagnitedSearch,
  ]);

  app.get("/valves/geojson", [ValvesController.getGeoJSON]);

  app.get("/valves/totalmapped", [ValvesController.totalMapped]);

  app.get("/valves/:ID", [ValvesController.findValveById]);

  app.get("/valves/details/:value", [ValvesController.findValveByName]);

  app.put("/valves/:ID", [ValvesController.updateValveById]);

  app.delete("/valves/:ID", [
    ValvesController.deleteValveById,
  ]);

  app.get("/valves", [ValvesController.findAllValves]);
};
