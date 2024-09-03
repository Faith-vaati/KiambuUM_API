const MeterReadingsModel = require("./MeterReadings.model");

exports.create = (req, res) => {
  MeterReadingsModel.create(req.body).then(
    (result) => {
      res.status(200).send({ success: "MeterReading Created Successfully" });
    },
    (err) => {
      res.status(203).send(err);
      MeterReading;
    }
  );
};

exports.findMeterReadingsById = (req, res) => {
  MeterReadingsModel.findMeterReadingsById(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.success);
    }
  );
};

exports.updateMeterReadingsById = (req, res) => {
  MeterReadingsModel.updateMeterReadingsById(req.body, req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
exports.deleteMeterReadingById = (req, res) => {
  console.log(req.params.id);
  MeterReadingsModel.deleteMeterReadingById(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
exports.findAllMeterReadings = (req, res) => {
  MeterReadingsModel.findAllMeterReadings().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findMeterReadingsPaginated = (req, res) => {
  MeterReadingsModel.findMeterReadingsPaginated(req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
