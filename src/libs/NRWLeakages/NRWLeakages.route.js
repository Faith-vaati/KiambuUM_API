const NRWLeakagesController = require("./NRWLeakages.controller");

exports.NRWLeakagesRoutes = function (app) {
  app.post("/nrw_leakages/create", [NRWLeakagesController.insert]);

  app.get("/nrw_leakages/type", [NRWLeakagesController.findType]);

  app.get("/nrw_leakages/serial/search/:value", [NRWLeakagesController.searchIncident]);

  app.get("/nrw_leakages/all/stats/:start/:end", [NRWLeakagesController.getStats]);

  app.get("/nrw_leakages/stats", [NRWLeakagesController.findStats]);

  app.get("/nrw_leakages/charts/status/:type", [
    NRWLeakagesController.findStatusCountByType,
  ]);

  app.get("/nrw_leakages/charts/monthly/:type", [
    NRWLeakagesController.findMonthlyCountByType,
  ]);

  app.get("/nrw_leakages/all/charts/:start/:end", [NRWLeakagesController.findCharts]);

  app.get("/nrw_leakages/joined/:type", [NRWLeakagesController.findNRWLeakagesPaginated]);

  app.get("/nrw_leakages/assigned/:nrwId/:offset", [
    NRWLeakagesController.findAssignedNRWLeakagesPaginated,
  ]);

  app.get("/nrw_leakages/status", [NRWLeakagesController.findStatus]);

  app.get("/nrw_leakages/status/:type", [NRWLeakagesController.findStatusByType]);

  app.get("/nrw_leakages/status/:status/:offset", [
    NRWLeakagesController.findNRWLeakageByStatus,
  ]);

  app.get("/nrw_leakages/monthly", [NRWLeakagesController.findMonthly]);

  app.get("/nrw_leakages/type/count/:type/all", [NRWLeakagesController.countEachType]);

  app.get("/nrw_leakages/type/count/:type", [NRWLeakagesController.findNRWLeakageTypeCount]);

  app.get("/nrw_leakages/type/:type/:offset", [NRWLeakagesController.findByType]);

  app.get("/nrw_leakages/type/:type", [NRWLeakagesController.findAllNRWLeakageByType]);

  app.get("/nrw_leakages/search/:query/:offset", [NRWLeakagesController.findByKeyword]);

  app.get("/nrw_leakages/statusbyid/:id", [NRWLeakagesController.getStatusByID]);

  app.get("/nrw_leakages/joined/paginated/:offset", [
    NRWLeakagesController.findNRWLeakagesJoined,
  ]);

  app.get("/nrw_leakages/year", [NRWLeakagesController.filterByYear]);

  app.delete("/nrw_leakages/:ID", [NRWLeakagesController.deleteNRWLeakageByID]);

  app.put("/nrw_leakages/update/:ID", [NRWLeakagesController.updateNRWLeakageByID]);

  app.get("/nrw_leakages/:ID", [NRWLeakagesController.findNRWLeakageByID]);

  app.get("/nrw_leakages", [NRWLeakagesController.findAllNRWLeakages]);

  app.get("/nrw_leakages/paginated/:type/:offset", [
    NRWLeakagesController.findAllNRWLeakagesPaginated,
  ]);

  app.get("/nrw_leakages/geojson/:type", [NRWLeakagesController.findGeojson]);

  app.get("/nrw_leakagesntasks/paginated/:offset", [
    NRWLeakagesController.findNRWLeakagesnTasksPaginated,
  ]);

  app.get("/nrw_leakages/searchall/:col/:val", [NRWLeakagesController.searchNRWLeakages]);

  app.get("/nrw_leakages/paginated/search/:column/:value/:offset", [
    NRWLeakagesController.paginatedSearchNRWLeakages,
  ]);

  app.get("/facilities/search/:value", [NRWLeakagesController.searchFacility]);

  app.get("/nrw_leakages/filterall/:column/:operator/:value", [
    NRWLeakagesController.filterNRWLeakages,
  ]);

  app.get("/nrw_leakages/filter/:column/:operator/:value/:offset", [
    NRWLeakagesController.paginatedFilterNRWLeakages,
  ]);

  app.get("/nrw_leakages/nrw_leakageed/:id/:offset", [
    NRWLeakagesController.getNRWLeakagesNRWLeakageedByUserId,
  ]);
};
