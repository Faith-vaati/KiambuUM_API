const CustomerChamberController = require("./CustomerChamber.controller");
const verifyToken = require("../Auth/VerifyToken");

exports.CustomerChamberRoutes = function (app) {
  app.post("/customerchamber/create", [CustomerChamberController.create]);

  app.get("/customerchamber/paginated/:offset", [
    CustomerChamberController.findCustomerChamberPagnited,
  ]);

  app.get("/customerchamber/searchone/:value", [
    CustomerChamberController.searchOneCustomerChamber,
  ]);

  app.get("/customerchamber/searchothers/:table/:value", [
    CustomerChamberController.searchOthers,
  ]);

  app.get("/customerchamber/paginated/search/:column/:value/:offset", [
    CustomerChamberController.findCustomerChamberPagnitedSearch,
  ]);

  app.get("/customerchamber/filter/:column/:operator/:value/:offset", [
    CustomerChamberController.filterCustomerChamber,
  ]);

  app.get("/customerchamber/geojson", [CustomerChamberController.getGeoJSON]);

  app.get("/customerchamber/totalmapped", [CustomerChamberController.totalMapped]);

  app.get("/customerchamber/all/stats", [CustomerChamberController.getStats]);

  app.get("/customerchamber/all/charts", [CustomerChamberController.findCharts]);

  app.get("/customerchamber/details/:Account", [
    CustomerChamberController.findCustomerChamberByAccount,
  ]);

  app.get("/customerchamber/:ID", [CustomerChamberController.findCustomerChamberById]);

  app.put("/customerchamber/:ID", [CustomerChamberController.updateCustomerChamberById]);

  app.delete("/customerchamber/:ID", [CustomerChamberController.deleteCustomerChamberById]);

  app.get("/customerchamber", [CustomerChamberController.findAllCustomerChamber]);
};
