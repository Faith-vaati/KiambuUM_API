const CategoriesController = require("./Categories.controller");
const verifyToken = require("../Utils/VerifyToken");
const CategoriesModel = require("./Categories.model");

exports.CategoriesRoutes = function (app) {
  app.post("/categories/create", [
    CategoriesModel.uploadFile,
    CategoriesController.create,
  ]);

  app.get("/categories/:ID", [CategoriesController.findCategoriesById]);

  app.delete("/categories/:id", [CategoriesController.deleteCategoryById]);

  app.put("/categories/:id", [CategoriesController.updateCategoriesById]);

  app.get("/categories", [CategoriesController.findAllCategories]);

  app.get("/categories/paginated/:offset", [
    CategoriesController.findCategoriesPaginated,
  ]);
};
