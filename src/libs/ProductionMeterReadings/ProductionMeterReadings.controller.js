const ProductionMeterReadingsModel = require("./ProductionMeterReadings.model");

exports.create = (req, res) => {
  ProductionMeterReadingsModel.create(req.body).then(
    (result) => {
      res.status(200).send({ success: "Submitted Successfully" });
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findProductionMeterReadingsById = (req, res) => {
  ProductionMeterReadingsModel.findProductionMeterReadingsById(
    req.params.ID
  ).then(
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
exports.deleteProductionMeterReadingById = (req, res) => {
  ProductionMeterReadingsModel.deleteProductionMeterReadingById(
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

exports.findDailyReadings = (req, res) => {
  ProductionMeterReadingsModel.findDailyReadings(req.params.date).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
