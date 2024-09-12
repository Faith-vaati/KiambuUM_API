const CustomerMeterReadingsController = require("./CustomerMeterReadings.controller");

exports.CustomerMeterReadingsRoutes = function (app) {
  app.post("/customerreading/create", [CustomerMeterReadingsController.create]);

  app.get("/customerreading/:ID", [
    CustomerMeterReadingsController.findCustomerMeterReadingsById,
  ]);

  app.get("/customerreading", [
    CustomerMeterReadingsController.findAllCustomerMeterReadings,
  ]);

  app.get("/customerreading/paginated/:offset", [
    CustomerMeterReadingsController.findCustomerMeterReadingsPaginated,
  ]);

  app.delete("/customerreading/:id", [
    CustomerMeterReadingsController.deleteCustomerMeterReadingById,
  ]);

  app.put("/customerreading/:id", [
    CustomerMeterReadingsController.updateCustomerMeterReadingsById,
  ]);
};
