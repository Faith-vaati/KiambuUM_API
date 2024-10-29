const NewWaterConnectionsModel = require("./NewWaterConnections.model");

exports.insert = (req, res) => {
  NewWaterConnectionsModel.createNewWaterConnection(req.body).then(
    (result) => {
      res.status(200).send({ success: "NewWaterConnection Created Successfully" });
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findAllNewWaterConnections = (req, res) => {
  NewWaterConnectionsModel.findAllNewWaterConnections().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findNewWaterConnectionsPaginated = (req, res) => {
  NewWaterConnectionsModel.findNewWaterConnectionsPaginated().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findStats = (req, res) => {
  NewWaterConnectionsModel.findStats().then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.findType = (req, res) => {
  NewWaterConnectionsModel.findType().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findByType = (req, res) => {
  NewWaterConnectionsModel.findNewWaterConnectionByType(req.params.type, req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findNewWaterConnectionByID = (req, res) => {
  NewWaterConnectionsModel.findNewWaterConnectionByID(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.updateNewWaterConnectionByID = (req, res) => {
  NewWaterConnectionsModel.updateNewWaterConnectionByID(req.body, req.params.NewWaterConnectionID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.deleteNewWaterConnectionByID = (req, res) => {
  NewWaterConnectionsModel.deleteNewWaterConnectionByID(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findByKeyword = (req, res) => {
  NewWaterConnectionsModel.findByKeyWord(req.params.query, req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.filterByYear = (req, res) => {
  NewWaterConnectionsModel.filterByYear().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.searchWaterConnection = (req, res) => {
  NewWaterConnectionsModel.searchWaterConnection(req.params.value).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
