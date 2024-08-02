const ProjectsLinesController = require("./ProjectLines.controller");
const verifyToken = require("../Auth/VerifyToken");

exports.ProjectsLinesRoutes = function (app) {
  app.post("/projectslines/create", [ProjectsLinesController.create]);

  app.get("/projectslines/paginated/:offset", [
    ProjectsLinesController.findProjectsLinesPagnited,
  ]);

  app.get("/projectslines/geojson", [ProjectsLinesController.getGeoJSON]);

  app.get("/projectslines/totalmapped", [ProjectsLinesController.totalMapped]);

  app.get("/projectslines/:ID", [ProjectsLinesController.findProjectsLineById]);

  app.get("/projectslines/details/:ID", [
    ProjectsLinesController.findProjectsLineByObjectId,
  ]);

  app.put("/projectslines/:ID", [
    ProjectsLinesController.updateProjectsLineById,
  ]);

  app.get("/projectslines", [ProjectsLinesController.findAllProjectsLines]);
};
