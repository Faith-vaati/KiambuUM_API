const ValvesModel = require("./Valves.model");

exports.create = (req, res) => {
  ValvesModel.createValve(req.body).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findValveById = (req, res) => {
  ValvesModel.findValveById(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.findValveByName = (req, res) => {
  ValvesModel.findValveByName(req.params.value).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.updateValveById = (req, res) => {
  ValvesModel.updateValveById(req.body, req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },

    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.deleteValveById = (req, res) => {
  ValvesModel.deleteValveById(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findAllValves = (req, res) => {
  ValvesModel.findAllValves().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findValvesPagnited = (req, res) => {
  ValvesModel.findValvesPagnited(req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findValvesPagnitedSearch = (req, res) => {
  ValvesModel.findValvesPagnitedSearch(
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
  ValvesModel.totalMapped().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.getGeoJSON = (req, res) => {
  ValvesModel.getGeoJSON().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
