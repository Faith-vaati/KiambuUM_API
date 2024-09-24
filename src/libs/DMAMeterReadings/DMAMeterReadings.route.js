const DMAMeterReadingsController = require("./DMAMeterReadings.controller");

exports.DMAMeterReadingsRoutes = function (app) {
  app.post("/dmareading/create", [DMAMeterReadingsController.create]);

  app.get("/dmareading/:ID", [
    DMAMeterReadingsController.findDMAMeterReadingsById,
  ]);

  app.get("/dmareading", [DMAMeterReadingsController.findAllDMAMeterReadings]);

  app.get("/dmareading/paginated/:offset", [
    DMAMeterReadingsController.findDMAMeterReadingsPaginated,
  ]);

  app.delete("/dmareading/:id", [
    DMAMeterReadingsController.deleteDMAMeterReadingById,
  ]);

  app.put("/dmareading/:id", [
    DMAMeterReadingsController.updateDMAMeterReadingsById,
  ]);
};
