const NRWController = require("./NRW.controller");
const verifyToken = require("./VerifyToken");

exports.NRWRoutes = function (app) {
  app.post("/nrw/register", [NRWController.insert]);

  app.post("/nrw/login", [NRWController.login]);

  app.get("/nrw/logout", [NRWController.logout]);

  app.post("/nrw/forgot", [NRWController.forgotPassword]);

  app.get("/nrw/paginated/:offset", [NRWController.findNRWPaginated]);

  app.get("/nrw/:authID", [NRWController.findNRWPaginated]);

  app.put("/nrw/:authID", [NRWController.updateNRWById]);

  app.delete("/nrw/:authID", [NRWController.deleteNRWById]);

  app.get("/nrw", [NRWController.findAllNRW]);
};
