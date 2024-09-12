const BulkMeterReadingsModel = require("./BulkMeterReadings.model");

exports.create = (req, res) => {
  BulkMeterReadingsModel.create(req.body).then(
    (result) => {
      res
        .status(200)
        .send({ success: "CustomerMeterReading Created Successfully" });
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findBulkMeterReadingsById = (req, res) => {
  BulkMeterReadingsModel.findBulkMeterReadingsById(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.success);
    }
  );
};

exports.updateBulkMeterReadingsById = (req, res) => {
  BulkMeterReadingsModel.updateBulkMeterReadingsById(
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
exports.deleteCustomerMeterReadingById = (req, res) => {
  BulkMeterReadingsModel.deleteCustomerMeterReadingById(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
exports.findAllBulkMeterReadings = (req, res) => {
  BulkMeterReadingsModel.findAllBulkMeterReadings().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findBulkMeterReadingsPaginated = (req, res) => {
  BulkMeterReadingsModel.findBulkMeterReadingsPaginated(
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
