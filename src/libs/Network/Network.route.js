const NetworkController = require("./Network.controller");

exports.NetworkRoutes = function (app) {
  app.get("/network/stats", NetworkController.getNetworkStats);
};
