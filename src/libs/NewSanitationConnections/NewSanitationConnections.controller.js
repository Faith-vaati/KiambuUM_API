const NewSanitationConnectionsModel = require("./NewSanitationConnections.model");

exports.insert = (req, res) => {
  NewSanitationConnectionsModel.createNewSanitationConnection(req.body).then(
    (result) => {
      res.status(200).send({ success: "NewSanitationConnection Created Successfully" });
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findAllNewSanitationConnections = (req, res) => {
  NewSanitationConnectionsModel.findAllNewSanitationConnections().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findNewSanitationConnectionsPaginated = (req, res) => {
  NewSanitationConnectionsModel.findNewSanitationConnectionsPaginated().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findStats = (req, res) => {
  NewSanitationConnectionsModel.findStats().then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.findType = (req, res) => {
  NewSanitationConnectionsModel.findType().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findByType = (req, res) => {
  NewSanitationConnectionsModel.findNewSanitationConnectionByType(req.params.type, req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findNewSanitationConnectionByID = (req, res) => {
  NewSanitationConnectionsModel.findNewSanitationConnectionByID(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.updateNewSanitationConnectionByID = (req, res) => {
  NewSanitationConnectionsModel.updateNewSanitationConnectionByID(req.body, req.params.NewSanitationConnectionID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.deleteNewSanitationConnectionByID = (req, res) => {
  NewSanitationConnectionsModel.deleteNewSanitationConnectionByID(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findByKeyword = (req, res) => {
  NewSanitationConnectionsModel.findByKeyWord(req.params.query, req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.filterByYear = (req, res) => {
  NewSanitationConnectionsModel.filterByYear().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.searchSanitationConnection = (req, res) => {
  NewSanitationConnectionsModel.searchSanitationConnection(
    req.params.value
  ).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
