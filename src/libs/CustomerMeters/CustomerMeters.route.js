const CustomerMetersController = require("./CustomerMeters.controller");
const verifyToken = require("../Auth/VerifyToken");

exports.CustomersRoutes = function (app) {
  app.post("/customers/create", [CustomerMetersController.create]);

  app.get("/customers/paginated/:offset", [
    CustomerMetersController.findCustomersPagnited,
  ]);

  app.get("/customers/searchone/:value", [
    CustomerMetersController.searchOneCustomer,
  ]);

  app.get("/customers/searchothers/:table/:value", [
    CustomerMetersController.searchOthers,
  ]);

  app.get("/customers/paginated/search/:column/:value/:offset", [
    CustomerMetersController.findCustomersPagnitedSearch,
  ]);

  app.get("/customers/filter/:column/:operator/:value/:offset", [
    CustomerMetersController.filterCustomers,
  ]);

  app.get("/customers/geojson", [CustomerMetersController.getGeoJSON]);

  app.get("/customers/totalmapped", [CustomerMetersController.totalMapped]);

  app.get("/customers/all/stats", [CustomerMetersController.getStats]);

  app.get("/customers/all/charts", [CustomerMetersController.findCharts]);

  app.get("/customers/details/:Account", [
    CustomerMetersController.findCustomerByAccount,
  ]);

  app.get("/customers/:ID", [CustomerMetersController.findCustomerById]);

  app.put("/customers/:ID", [CustomerMetersController.updateCustomerById]);

  app.delete("/customers/:ID", [CustomerMetersController.deleteCustomerById]);

  app.get("/customers", [CustomerMetersController.findAllCustomers]);
};
