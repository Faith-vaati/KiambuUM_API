const AssignedReportController = require("./AssignedReports.controller");
const verifyToken = require("../Auth/VerifyToken");

exports.AssignedReportRoutes = function (app) {
  app.post("/assigned/create", [AssignedReportController.create]);

  app.get("/assigned/:id", [AssignedReportController.findAssignedReportById]);

  app.get("/assigned/report/:id", [AssignedReportController.findByReportsID]);

  app.put("/assigned/:id", [AssignedReportController.updateAssignedReportById]);

  app.get("/assigned", [AssignedReportController.findAllAssignedReports]);

  app.delete("/assigned/:id", [
    AssignedReportController.deleteAssignedReportById,
  ]);
};
