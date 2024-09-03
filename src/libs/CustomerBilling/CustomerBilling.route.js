const CustomerBillingController = require("./CustomerBilling.controller");
const verifyToken = require("./VerifyToken");

exports.CustomerBillingRoutes = function (app) {
  app.post("/customerbilling/create", [CustomerBillingController.insert]);

  app.get("/customerbilling/managementdata", [
    CustomerBillingController.findManagementData,
  ]);

  app.get("/customerbilling/mapdata", [CustomerBillingController.findMapData]);

  app.get("/customerbilling/mapdata/filter/:table/:column/:operator/:value", [
    CustomerBillingController.findCustomerBillingFilter,
  ]);

  app.get("/customerbilling/filter/:column/:operator/:value/:offset", [
    CustomerBillingController.filterBilling,
  ]);

  app.get("/customerbilling/paginated/:offset", [
    CustomerBillingController.findCustomerBillingPaginated,
  ]);

  app.get("/customerbilling/search/:column/:value/:offset", [
    CustomerBillingController.findCustomersPagnitedSearch,
  ]);

  app.get("/customerbilling/all/charts/:year", [
    CustomerBillingController.findCharts,
  ]);

  app.get("/customerbilling/all/stats", [CustomerBillingController.findStats]);

  app.get("/customerbilling/mapdata/all", [
    CustomerBillingController.findCustomerBilling,
  ]);

  app.put("/customerbilling/:ID", [
    CustomerBillingController.updateCustomerBillingById,
  ]);

  app.delete("/customerbilling/:ID", [
    CustomerBillingController.deleteCustomerBillingById,
  ]);

  app.get("/customerbilling/:ID", [
    CustomerBillingController.findCustomerBillingById,
  ]);

  app.get("/customerbilling", [
    CustomerBillingController.findAllCustomerBilling,
  ]);
};
