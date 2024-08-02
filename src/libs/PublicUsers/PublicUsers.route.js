const PublicUsers = require("./PublicUsers.controller");
const verifyToken = require("./VerifyToken");

exports.PublicUsersRoutes = function (app) {
  app.post("/publicusers/register", [PublicUsers.createAccount]);

  app.post("/publicusers/login", [PublicUsers.userlogin]);

  app.get("/publicusers/logout", [PublicUsers.logout]);

  app.post("/publicusers/forgot", [PublicUsers.forgotPassword]);

  app.get("/publicusers/:userID", [PublicUsers.findAuthById]);

  app.put("/publicusers/update/:userID", [PublicUsers.updateAuthById]);

  app.get("/publicusers/paginated/:offset", [
    PublicUsers.findPublicUsersPaginated,
  ]);

  app.get("/publicusers/quicksearch/:q/:offset", [PublicUsers.quickSearch]);

  app.get("/publicusers", [PublicUsers.findAllPublicUsers]);

  app.delete("/publicusers/:UserID", [PublicUsers.deleteUserById]);
};
