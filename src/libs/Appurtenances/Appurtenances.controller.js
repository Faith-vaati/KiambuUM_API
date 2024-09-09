const AppurtenancesModel = require("./Appurtenances.model");

exports.create = (req, res) => {
  AppurtenancesModel.createAppurtenances(req.body).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findAppurtenancesById = (req, res) => {
  AppurtenancesModel.findAppurtenancesById(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.updateAppurtenancesById = (req, res) => {
  AppurtenancesModel.updateAppurtenancesById(req.body, req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },

    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.deleteAppurtenancesById = (req, res) => {
  AppurtenancesModel.deleteAppurtenancesById(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findAllAppurtenances = (req, res) => {
  AppurtenancesModel.findAllAppurtenances().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findAppurtenancesPagnited = (req, res) => {
  AppurtenancesModel.findAppurtenancesPagnited(req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findAppurtenancesPagnitedSearch = (req, res) => {
  AppurtenancesModel.findAppurtenancesPagnitedSearch(
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

exports.searchOneAppurtenances = (req, res) => {
  AppurtenancesModel.searchOneAppurtenances(req.params.value).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.searchOthers = (req, res) => {
  AppurtenancesModel.searchOthers(req.params.table, req.params.value).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.filterAppurtenances = (req, res) => {
  AppurtenancesModel.filterAppurtenances(
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
  AppurtenancesModel.totalMapped().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.getGeoJSON = (req, res) => {
  AppurtenancesModel.getGeoJSON().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.getStats = (req, res) => {
  AppurtenancesModel.getStats().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findCharts = (req, res) => {
  AppurtenancesModel.findCharts().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
