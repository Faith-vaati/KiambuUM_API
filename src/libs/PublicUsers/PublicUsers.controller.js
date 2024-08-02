const PublicUsers = require("./PublicUsers.model");

exports.createAccount = (req, res) => {
  PublicUsers.createAccount(req.body).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.userlogin = (req, res) => {
  PublicUsers.userlogin(res, req.body).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.forgotPassword = (req, res) => {
  PublicUsers.forgotPassword(req.body).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findAuthById = (req, res) => {
  PublicUsers.findAuthById(req.params.userID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.success);
    }
  );
};

exports.updateAuthById = (req, res) => {
  PublicUsers.updateAuthById(req.body, req.params.userID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findAllPublicUsers = (req, res) => {
  PublicUsers.findAllPublicUsers().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findPublicUsersPaginated = (req, res) => {
  PublicUsers.findPublicUsersPaginated(req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.quickSearch = (req, res) => {
  PublicUsers.quickSearch(req.params.q, req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  }),
    res.status(200).send({ success: "Logout successful" });
};



exports.deleteUserById = (req, res) => {
  PublicUsers.deleteUserById(req.params.UserID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};