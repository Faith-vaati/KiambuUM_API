const BoreholesModel = require("./Boreholes.model");

exports.create = (req, res) => {
    BoreholesModel.createBoreholes(req.body).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findBoreholesById = (req, res) => {
    BoreholesModel.findBoreholesById(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.updateBoreholesById = (req, res) => {
    BoreholesModel.updateBoreholesById(req.body, req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },

    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.deleteBoreholesById = (req, res) => {
    BoreholesModel.deleteBoreholesById(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findAllBoreholes = (req, res) => {
    BoreholesModel.findAllBoreholes().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findBoreholesPagnited = (req, res) => {
    BoreholesModel.findBoreholesPagnited(req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findBoreholesPagnitedSearch = (req, res) => {
    BoreholesModel.findBoreholesPagnitedSearch(
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

exports.searchOneBoreholes = (req, res) => {
    BoreholesModel.searchOneBoreholes(req.params.value).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.searchOthers = (req, res) => {
    BoreholesModel.searchOthers(req.params.table, req.params.value).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.filterBoreholes = (req, res) => {
    BoreholesModel.filterBoreholes(
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
    BoreholesModel.totalMapped().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.getGeoJSON = (req, res) => {
    BoreholesModel.getGeoJSON().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.getStats = (req, res) => {
    BoreholesModel.getStats().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findCharts = (req, res) => {
    BoreholesModel.findCharts().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
