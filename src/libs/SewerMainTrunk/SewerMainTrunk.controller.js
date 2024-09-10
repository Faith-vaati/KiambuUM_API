const SewerMainTrunkModel = require("./SewerMainTrunk.model");

exports.create = (req, res) => {
  SewerMainTrunkModel.createSewerMainTrunk(req.body).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findSewerMainTrunkById = (req, res) => {
  SewerMainTrunkModel.findSewerMainTrunkById(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.findSewerMainTrunkByName = (req, res) => {
  SewerMainTrunkModel.findSewerMainTrunkByName(req.params.value).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.updateSewerMainTrunkById = (req, res) => {
  SewerMainTrunkModel.updateSewerMainTrunkById(req.body, req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },

    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.deleteSewerMainTrunkById = (req, res) => {
  SewerMainTrunkModel.deleteSewerMainTrunkById(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findAllSewerMainTrunk = (req, res) => {
  SewerMainTrunkModel.findAllSewerMainTrunk().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findSewerMainTrunkPagnited = (req, res) => {
  SewerMainTrunkModel.findSewerMainTrunkPagnited(req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.totalMapped = (req, res) => {
  SewerMainTrunkModel.totalMapped().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.getGeoJSON = (req, res) => {
  SewerMainTrunkModel.getGeoJSON().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
