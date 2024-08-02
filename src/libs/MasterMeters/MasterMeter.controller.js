const MasterMetersModel = require("./MasterMeters.model");

exports.create = (req, res) => {
  MasterMetersModel.createMasterMeter(req.body).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};



exports.findMasterMeterById = (req, res) => {
  MasterMetersModel.findMasterMeterById(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};



exports.findMasterMeterByObjectId = (req, res) => {
  MasterMetersModel.findMasterMeterByObjectId(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.updateMasterMeterById = (req, res) => {
  MasterMetersModel.updateMasterMeterById(req.body, req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findAllMasterMeters = (req, res) => {
  MasterMetersModel.findAllMasterMeters().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findMasterMetersPagnited = (req, res) => {
  MasterMetersModel.findMasterMetersPagnited(req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findMasterMetersPagnitedSearch = (req, res) => {
  MasterMetersModel.findMasterMetersPagnitedSearch(
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

exports.deleteMasterMeterById = (req, res) => {
  MasterMetersModel.deleteMasterMeterById(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.totalMapped = (req, res) => {
  MasterMetersModel.totalMapped().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.getGeoJSON = (req, res) => {
  MasterMetersModel.getGeoJSON().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
