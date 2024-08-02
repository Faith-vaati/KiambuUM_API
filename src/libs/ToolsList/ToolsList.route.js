const ToolsListController = require("./ToolsList.controller");

exports.ToolsListRoutes = function (app) {
  app.post("/toolslist/create", [ToolsListController.create]);

  app.post("/toolslist/submittabledata/:tableName", [
    ToolsListController.submitTableData,
  ]);

  app.post("/toolslist/createtable", [ToolsListController.createTable]);

  app.get("/toolslist/quicksearch/:column/:q", [
    ToolsListController.quickSearch,
  ]);

  app.get("/toolslist/bytablename/:table", [
    ToolsListController.getByTableName,
  ]);

  app.get("/toolslist/paginated/:offset", [
    ToolsListController.findToolsListPagnited,
  ]);

  app.get("/toolslist/totalmapped", [ToolsListController.totalMapped]);

  app.get("/toolslist/:ID", [ToolsListController.findToolsListById]);

  app.get("/toolslist/details/:ID", [
    ToolsListController.findToolsListByObjectId,
  ]);

  app.put("/toolslist/:ID", [ToolsListController.updateToolsListById]);

  app.get("/toolslist", [ToolsListController.findAllToolsList]);

  app.delete("/toolslist/:ID", [ToolsListController.deleteToolsListById]);
};
