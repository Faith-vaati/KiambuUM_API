const ProductionMeterReadingsController = require("./ProductionMeterReadings.controller");

exports.ProductionMeterReadingsRoutes = function (app) {
  app.post("/bulkreading/create", [ProductionMeterReadingsController.create]);

  app.get("/bulkreading/:ID", [
    ProductionMeterReadingsController.findProductionMeterReadingsById,
  ]);

  app.get("/bulkreading", [
    ProductionMeterReadingsController.findAllProductionMeterReadings,
  ]);

  app.get("/bulkreading/paginated/:offset", [
    ProductionMeterReadingsController.findProductionMeterReadingsPaginated,
  ]);

  app.delete("/bulkreading/:id", [
    ProductionMeterReadingsController.deleteCustomerMeterReadingById,
  ]);

  app.put("/bulkreading/:id", [
    ProductionMeterReadingsController.updateProductionMeterReadingsById,
  ]);
};
