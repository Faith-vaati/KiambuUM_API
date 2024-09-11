const ConsumerLineModel = require("./ConsumerLine.model");

exports.create = (req, res) => {
  ConsumerLineModel.createConsumerLine(req.body).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findConsumerLineById = (req, res) => {
  ConsumerLineModel.findConsumerLineById(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.findConsumerLineByName = (req, res) => {
  ConsumerLineModel.findConsumerLineByName(req.params.value).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.updateConsumerLineById = (req, res) => {
  ConsumerLineModel.updateConsumerLineById(req.body, req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },

    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.deleteConsumerLineById = (req, res) => {
  ConsumerLineModel.deleteConsumerLineById(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findAllConsumerLines = (req, res) => {
  ConsumerLineModel.findAllConsumerLines().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findConsumerLinesPaginated = (req, res) => {
  ConsumerLineModel.findConsumerLinesPaginated(req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.totalMapped = (req, res) => {
  ConsumerLineModel.totalMapped().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.getGeoJSON = (req, res) => {
  ConsumerLineModel.getGeoJSON().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
