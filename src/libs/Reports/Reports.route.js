const ReportsController = require("./Reports.controller");

exports.ReportsRoutes = function (app) {
  app.post("/reports/create", [ReportsController.insert]);

  app.get("/reports/type", [ReportsController.findType]);

  app.get("/reports/serial/search/:value", [ReportsController.searchIncident]);

  app.get("/reports/all/stats/:start/:end", [ReportsController.getStats]);

  app.get("/reports/stats", [ReportsController.findStats]);

  app.get("/reports/charts/status/:type", [
    ReportsController.findStatusCountByType,
  ]);

  app.get("/reports/charts/monthly/:type", [
    ReportsController.findMonthlyCountByType,
  ]);

  app.get("/reports/all/charts/:start/:end", [ReportsController.findCharts]);

  app.get("/reports/joined/:type", [ReportsController.findReportsPaginated]);

  app.get("/reports/assigned/:nrwId/:offset", [
    ReportsController.findAssignedReportsPaginated,
  ]);

  app.get("/reports/status", [ReportsController.findStatus]);

  app.get("/reports/status/:type", [ReportsController.findStatusByType]);

  app.get("/reports/status/:status/:offset", [
    ReportsController.findReportByStatus,
  ]);

  app.get("/reports/monthly", [ReportsController.findMonthly]);

  app.get("/reports/type/count/:type/all", [ReportsController.countEachType]);

  app.get("/reports/type/count/:type", [ReportsController.findReportTypeCount]);

  app.get("/reports/type/:type/:offset", [ReportsController.findByType]);

  app.get("/reports/type/:type", [ReportsController.findAllReportByType]);

  app.get("/reports/search/:query/:offset", [ReportsController.findByKeyword]);

  app.get("/reports/statusbyid/:id", [ReportsController.getStatusByID]);

  app.get("/reports/joined/paginated/:offset", [
    ReportsController.findReportsJoined,
  ]);

  app.get("/reports/year", [ReportsController.filterByYear]);

  app.delete("/reports/:ID", [ReportsController.deleteReportByID]);

  app.put("/reports/update/:ID", [ReportsController.updateReportByID]);

  app.get("/reports/:ID", [ReportsController.findReportByID]);

  app.get("/reports", [ReportsController.findAllReports]);

  app.get("/reports/paginated/:type/:offset", [
    ReportsController.findAllReportsPaginated,
  ]);

  app.get("/reports/geojson/:type", [ReportsController.findGeojson]);

  app.get("/reportsntasks/paginated/:offset", [
    ReportsController.findReportsnTasksPaginated,
  ]);

  app.get("/reports/searchall/:col/:val", [ReportsController.searchReports]);

  app.get("/reports/paginated/search/:column/:value/:offset", [
    ReportsController.paginatedSearchReports,
  ]);

  app.get("/facilities/search/:value", [ReportsController.searchFacility]);

  app.get("/reports/filterall/:column/:operator/:value", [
    ReportsController.filterReports,
  ]);

  app.get("/reports/filter/:column/:operator/:value/:offset", [
    ReportsController.paginatedFilterReports,
  ]);

  app.get("/reports/reported/:id/:offset", [
    ReportsController.getReportsReportedByUserId,
  ]);
};
