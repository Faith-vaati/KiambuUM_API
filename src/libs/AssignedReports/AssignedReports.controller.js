const AssignedReportModel = require("./AssignedReports.model");

exports.create = (req, res) => {
  AssignedReportModel.create(req.body).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findAssignedReportById = (req, res) => {
  AssignedReportModel.findAssignedReportById(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.findByReportsID = (req, res) => {
  AssignedReportModel.findResolutionByReportID(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.updateAssignedReportById = (req, res) => {
  AssignedReportModel.updateAssignedReportById(
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

exports.deleteAssignedReportById = (req, res) => {
  AssignedReportModel.deleteAssignedReportById(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findAllAssignedReports = (req, res) => {
  AssignedReportModel.findAllAssignedReports().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
