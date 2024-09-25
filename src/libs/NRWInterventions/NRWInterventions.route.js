const NRWInterventionController = require("./NRWInterventions.controller");

exports.NRWInterventionRoutes = function (app) {
  app.post("/intervention/create", [NRWInterventionController.create]);

  app.get("/intervention/paginated/:offset", [
    NRWInterventionController.findNRWInterventionPagnited,
  ]);

  app.get("/intervention/searchone/:value", [
    NRWInterventionController.searchOneNRWIntervention,
  ]);

  app.get("/intervention/searchothers/:table/:value", [
    NRWInterventionController.searchOthers,
  ]);

  app.get("/intervention/paginated/search/:column/:value/:offset", [
    NRWInterventionController.findNRWInterventionPagnitedSearch,
  ]);

  app.get("/intervention/filter/:column/:operator/:value/:offset", [
    NRWInterventionController.filterNRWIntervention,
  ]);

  app.get("/intervention/geojson", [NRWInterventionController.getGeoJSON]);

  app.get("/intervention/totalmapped", [NRWInterventionController.totalMapped]);

  app.get("/intervention/all/stats", [NRWInterventionController.getStats]);

  app.get("/intervention/all/charts", [NRWInterventionController.findCharts]);

  app.get("/intervention/details/:value", [
    NRWInterventionController.findNRWInterventionByName,
  ]);

  app.get("/intervention/:ID", [
    NRWInterventionController.findNRWInterventionById,
  ]);

  app.put("/intervention/:ID", [
    NRWInterventionController.updateNRWInterventionById,
  ]);

  app.delete("/intervention/:ID", [
    NRWInterventionController.deleteNRWInterventionById,
  ]);

  app.get("/intervention", [NRWInterventionController.findAllNRWIntervention]);
};
