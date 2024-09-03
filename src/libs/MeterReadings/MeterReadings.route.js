const MeterReadingsController = require("./MeterReadings.controller");
const verifyToken = require("../Utils/VerifyToken");

exports.MeterReadingsRoutes = function (app) {
  app.post("/meterreading/create", [MeterReadingsController.create]);

  app.get("/meterreading/:ID", [MeterReadingsController.findMeterReadingsById]);

  app.get("/meterreading", [MeterReadingsController.findAllMeterReadings]);

  app.get("/meterreading/paginated/:offset", [
    MeterReadingsController.findMeterReadingsPaginated,
  ]);

  app.delete("/meterreading/:id", [
    MeterReadingsController.deleteMeterReadingById,
  ]);

  app.put("/meterreading/:id", [
    MeterReadingsController.updateMeterReadingsById,
  ]);
};
