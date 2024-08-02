const NRWModel = require("./NRW.model");

exports.insert = (req, res) => {
  NRWModel.createNRW(req.body).then(
    (result) => {
      res.status(200).send({ success: "User Created successfully" });
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.login = (req, res) => {
  NRWModel.loginNRW(res, req.body).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.forgotPassword = (req, res) => {
  NRWModel.forgotPassword(req.body).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findNRWById = (req, res) => {
  NRWModel.findNRWById(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.success);
    }
  );
};

exports.updateNRWById = (req, res) => {
  NRWModel.updateNRWById(req.body, req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.deleteNRWById = (req, res) => {
  NRWModel.deleteNRWById(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findAllNRW = (req, res) => {
  NRWModel.findAllNRW().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findNRWPaginated = (req, res) => {
  NRWModel.findNRWPaginated(req.params.offset).then(
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
  });
  res.status(200).send({ success: "Logout successful" });
};
