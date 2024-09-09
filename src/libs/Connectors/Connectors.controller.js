const ConnectorsModel = require("./Connectors.model");

exports.create = (req, res) => {
  ConnectorsModel.createConnectors(req.body).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findConnectorsById = (req, res) => {
  ConnectorsModel.findConnectorsById(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.updateConnectorsById = (req, res) => {
  ConnectorsModel.updateConnectorsById(req.body, req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },

    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.deleteConnectorsById = (req, res) => {
  ConnectorsModel.deleteConnectorsById(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findAllConnectors = (req, res) => {
  ConnectorsModel.findAllConnectors().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findConnectorsPagnited = (req, res) => {
  ConnectorsModel.findConnectorsPagnited(req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findConnectorsPagnitedSearch = (req, res) => {
  ConnectorsModel.findConnectorsPagnitedSearch(
    req.params.column,
    req.params.value,
    req.params.offset
  ).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.searchOneConnecters = (req, res) => {
  ConnectorsModel.searchOneConnectors(req.params.value).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.searchOthers = (req, res) => {
  ConnectorsModel.searchOthers(req.params.table, req.params.value).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.filterConnectors = (req, res) => {
  ConnectorsModel.filterConnectors(
    req.params.column,
    req.params.operator,
    req.params.value,
    req.params.offset
  ).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.totalMapped = (req, res) => {
  ConnectorsModel.totalMapped().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.getGeoJSON = (req, res) => {
  ConnectorsModel.getGeoJSON().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.getStats = (req, res) => {
  ConnectorsModel.getStats().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findCharts = (req, res) => {
  ConnectorsModel.findCharts().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
