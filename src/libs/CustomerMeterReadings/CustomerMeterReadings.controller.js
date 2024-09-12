const CustomerMeterReadingsModel = require("./CustomerMeterReadings.model");

exports.create = (req, res) => {
  CustomerMeterReadingsModel.create(req.body).then(
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

exports.findCustomerMeterReadingsById = (req, res) => {
  CustomerMeterReadingsModel.findCustomerMeterReadingsById(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.success);
    }
  );
};

exports.updateCustomerMeterReadingsById = (req, res) => {
  CustomerMeterReadingsModel.updateCustomerMeterReadingsById(
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
  CustomerMeterReadingsModel.deleteCustomerMeterReadingById(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
exports.findAllCustomerMeterReadings = (req, res) => {
  CustomerMeterReadingsModel.findAllCustomerMeterReadings().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findCustomerMeterReadingsPaginated = (req, res) => {
  CustomerMeterReadingsModel.findCustomerMeterReadingsPaginated(
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
