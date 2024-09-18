const ProductionMeterReadingsModel = require("./ProductionMeterReadings.model");

exports.create = (req, res) => {
  ProductionMeterReadingsModel.create(req.body).then(
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

exports.findProductionMeterReadingsById = (req, res) => {
  ProductionMeterReadingsModel.findProductionMeterReadingsById(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.success);
    }
  );
};

exports.updateProductionMeterReadingsById = (req, res) => {
  ProductionMeterReadingsModel.updateProductionMeterReadingsById(
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
  ProductionMeterReadingsModel.deleteCustomerMeterReadingById(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
exports.findAllProductionMeterReadings = (req, res) => {
  ProductionMeterReadingsModel.findAllProductionMeterReadings().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findProductionMeterReadingsPaginated = (req, res) => {
  ProductionMeterReadingsModel.findProductionMeterReadingsPaginated(
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
