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
    NRWMeterReadingsController.findDailyReadings,
  ]);

  app.delete("/nrwreading/:id", [
    NRWMeterReadingsController.deleteNRWMeterReadingById,
  ]);

  app.put("/nrwreading/:id", [
    NRWMeterReadingsController.updateNRWMeterReadingsById,
  ]);
};
