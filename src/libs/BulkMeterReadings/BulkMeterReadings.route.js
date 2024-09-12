const BulkMeterReadingsController = require("./BulkMeterReadings.controller");

exports.BulkMeterReadingsRoutes = function (app) {
  app.post("/bulkreading/create", [BulkMeterReadingsController.create]);

  app.get("/bulkreading/:ID", [
    BulkMeterReadingsController.findBulkMeterReadingsById,
  ]);

  app.get("/bulkreading", [
    BulkMeterReadingsController.findAllBulkMeterReadings,
  ]);

  app.get("/bulkreading/paginated/:offset", [
    BulkMeterReadingsController.findBulkMeterReadingsPaginated,
  ]);

  app.delete("/bulkreading/:id", [
    BulkMeterReadingsController.deleteCustomerMeterReadingById,
  ]);

  app.put("/bulkreading/:id", [
    BulkMeterReadingsController.updateBulkMeterReadingsById,
  ]);
};
