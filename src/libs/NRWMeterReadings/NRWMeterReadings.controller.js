const NRWMeterReadingsModel = require("./NRWMeterReadings.model");

exports.create = (req, res) => {
  NRWMeterReadingsModel.create(req.body).then(
    (result) => {
      res.status(200).send({ success: "Submitted Successfully" });
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findNRWMeterReadingsById = (req, res) => {
  NRWMeterReadingsModel.findNRWMeterReadingsById(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.success);
    }
  );
};

exports.updateNRWMeterReadingsById = (req, res) => {
  NRWMeterReadingsModel.updateNRWMeterReadingsById(
    req.body,
    req.params.id
  ).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
exports.deleteNRWMeterReadingById = (req, res) => {
  NRWMeterReadingsModel.deleteNRWMeterReadingById(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
exports.findAllNRWMeterReadings = (req, res) => {
  NRWMeterReadingsModel.findAllNRWMeterReadings().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.searchDMA = (req, res) => {
  NRWMeterReadingsModel.searchDMA(req.params.dma).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findDMAReadings = (req, res) => {
  NRWMeterReadingsModel.findDMAReadings(req.params.dma).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findNRWReadings = (req, res) => {
  NRWMeterReadingsModel.findNRWReadings(
    req.params.start,
    req.params.end,
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

exports.findNRWReadingPaginated = (req, res) => {
  NRWMeterReadingsModel.findNRWReadingPaginated(
    req.params.dma,
    req.params.type,
    req.params.start,
    req.params.end
  ).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.dashboardAnalysis = (req, res) => {
  NRWMeterReadingsModel.dashboardAnalysis(
    req.params.dma,
    req.params.start,
    req.params.end
  ).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.searchByAccountNo = (req, res) => {
  NRWMeterReadingsModel.searchByAccountNo(req.params.accountNo).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.updateSecondReading = (req, res) => {
  NRWMeterReadingsModel.updateSecondReading(req.body).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
