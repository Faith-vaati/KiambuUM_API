const ProductionMeterReadingsController = require("./ProductionMeterReadings.controller");

exports.ProductionMeterReadingsRoutes = function (app) {
  app.post("/productionreading/create", [
    ProductionMeterReadingsController.create,
  ]);

  app.get("/productionreading/:ID", [
    ProductionMeterReadingsController.findProductionMeterReadingsById,
  ]);

  app.get("/productionreading", [
    ProductionMeterReadingsController.findAllProductionMeterReadings,
  ]);

    app.get("/dmareading/searchdma/:dma", [
      ProductionMeterReadingsController.searchDMA,
    ]);

    app.get("/dmareading/bydma/:dma", [
      ProductionMeterReadingsController.findDMAReadings,
    ]);

  app.get("/productionreading/daily/:start/:end", [
    ProductionMeterReadingsController.findDailyReadings,
  ]);

  app.delete("/productionreading/:id", [
    ProductionMeterReadingsController.deleteProductionMeterReadingById,
  ]);

  app.put("/productionreading/:id", [
    ProductionMeterReadingsController.updateProductionMeterReadingsById,
  ]);
};
