const CustomerLineController = require("./NewCustomerLineConnection.controller");
const verifyToken = require("../Auth/VerifyToken");

exports.NewCustomerLineConnectionRoutes = function (app) {
  app.post("/customerline/create", [CustomerLineController.create]);

  app.get("/customerline/paginated/:offset", [
    CustomerLineController.findCustomerLinesPaginated,
  ]);

  app.get("/customerline/geojson", [CustomerLineController.getGeoJSON]);

  app.get("/customerline/totalmapped", [CustomerLineController.totalMapped]);

  app.get("/customerline/:ID", [CustomerLineController.findCustomerLineById]);

  app.get("/customerline/details/:value", [
    CustomerLineController.findCustomerLineByName,
  ]);

  app.put("/customerline/:ID", [CustomerLineController.updateCustomerLineById]);

  app.delete("/customerline/:ID", [
    CustomerLineController.deleteCustomerLineById,
  ]);

  app.get("/customerline", [CustomerLineController.findAllCustomerLines]);
};
