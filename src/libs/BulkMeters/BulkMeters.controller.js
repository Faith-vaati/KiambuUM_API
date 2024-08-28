const BulkMetersModel = require("./BulkMeters.model");

exports.create = (req, res) => {
  BulkMetersModel.createBulkMeters(req.body).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findBulkMetersById = (req, res) => {
  BulkMetersModel.findBulkMetersById(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.findBulkMetersByAccount = (req, res) => {
  BulkMetersModel.findBulkMetersByAccount(req.params.Account).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.updateBulkMetersById = (req, res) => {
  BulkMetersModel.updateBulkMetersById(req.body, req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },

    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.deleteBulkMetersById = (req, res) => {
  BulkMetersModel.deleteBulkMetersById(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findAllBulkMeters = (req, res) => {
  BulkMetersModel.findAllBulkMeters().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findBulkMetersPagnited = (req, res) => {
  BulkMetersModel.findBulkMetersPagnited(req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findBulkMetersPagnitedSearch = (req, res) => {
  OfftakersModel.findBulkMetersPagnitedSearch(
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

exports.searchOneBulkMeters = (req, res) => {
  BulkMetersModel.searchOneBulkMeters(req.params.value).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.searchOthers = (req, res) => {
  BulkMetersModel.searchOthers(req.params.table, req.params.value).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.filterBulkMeters = (req, res) => {
  BulkMetersModel.filterBulkMeters(
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
  BulkMetersModel.totalMapped().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.getGeoJSON = (req, res) => {
  BulkMetersModel.getGeoJSON().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.getStats = (req, res) => {
  BulkMetersModel.getStats().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findCharts = (req, res) => {
  BulkMetersModel.findCharts().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
