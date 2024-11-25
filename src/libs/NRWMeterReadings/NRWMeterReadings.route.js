const NRWMeterReadingsController = require("./NRWMeterReadings.controller");

exports.NRWMeterReadingsRoutes = function (app) {
  app.post("/nrwreading/create", [NRWMeterReadingsController.create]);

  app.get("/nrwreading/:ID", [
    NRWMeterReadingsController.findNRWMeterReadingsById,
  ]);

  app.get("/nrwreading", [NRWMeterReadingsController.findAllNRWMeterReadings]);

  app.get("/nrwreading/searchdma/:dma", [NRWMeterReadingsController.searchDMA]);

  app.get("/nrwreading/bydma/:dma", [
    NRWMeterReadingsController.findDMAReadings,
  ]);

  app.get("/nrwreading/daily/:start/:end/:offset", [
    NRWMeterReadingsController.findNRWReadings,
  ]);

  app.get("/nrwreading/:dma/:type/:start/:end", [
    NRWMeterReadingsController.findNRWReadingPaginated,
  ]);

  app.get("/nrwreading/dma/stats/:dma/:start/:end", [
    NRWMeterReadingsController.dashboardAnalysis,
  ]);

  app.delete("/nrwreading/:id", [
    NRWMeterReadingsController.deleteNRWMeterReadingById,
  ]);

  app.put("/nrwreading/:id", [
    NRWMeterReadingsController.updateNRWMeterReadingsById,
  ]);
};
