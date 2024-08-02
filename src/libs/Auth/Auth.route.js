const AuthController = require("./Auth.controller");
const verifyToken = require("./VerifyToken");

exports.AuthRoutes = function (app) {
  app.post("/auth/register", [AuthController.insert]);

  app.post("/auth/login", [AuthController.login]);

  app.put("/auth/:authID", [verifyToken, AuthController.updateAuthById]);

  app.post("/auth/forgot", [AuthController.forgotPassword]);

  app.get("/auth/checkauth", [verifyToken, AuthController.checkauth]);

  app.get("/auth/administrators/paginated/:q/:offset", [
    AuthController.findAuthAdmin,
  ]);

  app.get("/auth/status/paginated/:q/:offset", [AuthController.findAuthStatus]);

  app.get("/auth/paginated/:offset", [AuthController.findAuthPaginated]);

  app.get("/auth/quicksearch/:q/:offset", [AuthController.quickSearch]);

  app.get("/auth/activity/:offset", [AuthController.findAuthActivity]);

  app.get("/auth/logout", [AuthController.logout]);

  app.get("/auth/:authID", [AuthController.findAuthById]);

  app.put("/auth/:authID", [verifyToken, AuthController.updateAuthById]);

  app.delete("/auth/:authID", [AuthController.deleteAuthById]);

  app.get("/auth", [AuthController.findAllAuth]);
};
