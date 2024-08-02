const ProjectsController = require("./Projects.controller");
exports.ProjectsRoutes = function (app) {
  app.post("/projects/create", [ProjectsController.insert]);

  app.get("/projects/paginated/:offset", [ProjectsController.findProjectsPaginated]);

  app.get("/projects/stats", [ProjectsController.findStats]);

  app.get("/projects/type/:type/:offset", [ProjectsController.findByType]);

  app.get("/projects/search/:query/:offset", [
    ProjectsController.findByKeyword,
  ]);

  app.get("/projects/year", [ProjectsController.filterByYear]);

  app.delete("/projects/:ProjectID", [ProjectsController.deleteProjectByID]);

  app.put("/projects/:ProjectID", [ProjectsController.updateProjectByID]);

  app.get("/projects/:ProjectID", [ProjectsController.findProjectByID]);

  app.get("/projects", [ProjectsController.findAllProjects]);
};
