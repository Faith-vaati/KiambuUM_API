const DMAMeterReadingsController = require("./DMAMeterReadings.controller");

exports.DMAMeterReadingsRoutes = function (app) {
  app.post("/dmareading/create", [DMAMeterReadingsController.create]);

  app.get("/dmareading/:ID", [
    DMAMeterReadingsController.findDMAMeterReadingsById,
  ]);

  app.get("/dmareading", [DMAMeterReadingsController.findAllDMAMeterReadings]);

  app.get("/dmareading/searchdma/:dma", [DMAMeterReadingsController.searchDMA]);

  app.get("/dmareading/bydma/:dma", [
    DMAMeterReadingsController.findDMAReadings,
  ]);

  app.get("/dmareading/daily/:start/:end/:offset", [
    DMAMeterReadingsController.findDailyReadings,
  ]);

  app.get("/dmareading/analysis/:start/:end", [
    DMAMeterReadingsController.findReadingAnalysis,
  ]);

  app.delete("/dmareading/:id", [
    DMAMeterReadingsController.deleteDMAMeterReadingById,
  ]);

  app.put("/dmareading/:id", [
    DMAMeterReadingsController.updateDMAMeterReadingsById,
  ]);
};
