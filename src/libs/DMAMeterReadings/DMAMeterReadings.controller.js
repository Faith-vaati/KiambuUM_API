const DMAMeterReadingsModel = require("./DMAMeterReadings.model");

exports.create = (req, res) => {
  DMAMeterReadingsModel.create(req.body).then(
    (result) => {
      res.status(200).send({ success: "Submitted Successfully" });
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findDMAMeterReadingsById = (req, res) => {
  DMAMeterReadingsModel.findDMAMeterReadingsById(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.success);
    }
  );
};

exports.updateDMAMeterReadingsById = (req, res) => {
  DMAMeterReadingsModel.updateDMAMeterReadingsById(
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
exports.deleteDMAMeterReadingById = (req, res) => {
  DMAMeterReadingsModel.deleteDMAMeterReadingById(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
exports.findAllDMAMeterReadings = (req, res) => {
  DMAMeterReadingsModel.findAllDMAMeterReadings().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findDailyReadings = (req, res) => {
  DMAMeterReadingsModel.findDailyReadings(
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
