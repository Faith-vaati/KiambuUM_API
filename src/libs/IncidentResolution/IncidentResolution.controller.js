const IncidentResolutionModel = require('./IncidentResolution.model');

exports.create = (req, res) => {
    IncidentResolutionModel.createIncidentResolution(req.body).then(
        (result) => {
            res.status(200).send(result);
        },
        (err) => {
            res.status(203).send(err);
        }
    );
};

exports.findIncidentResolutionById = (req, res) => {
    IncidentResolutionModel.findIncidentResolutionById(req.params.id).then(
        (result) => {
            res.status(200).send(result);
        },
        (err) => {
            res.status(203).send(err.message);
        }
    );
};

exports.findByReportsID = (req, res) => {
    IncidentResolutionModel.findResolutionByReportID(req.params.id).then(
        (result) => {
            res.status(200).send(result);
        },
        (err) => {
            res.status(203).send(err.message);
        }
    );
};

exports.updateIncidentResolutionById = (req, res) => {
    IncidentResolutionModel.updateIncidentResolutionById(req.body, req.params.id).then(
        (result) => {
            res.status(200).send(result);
        },
        (err) => {
            res.status(203).send(err);
        }
    );
};

exports.deleteIncidentResolutionById = (req, res) => {
    IncidentResolutionModel.deleteIncidentResolutionById(req.params.id).then(
        (result) => {
            res.status(200).send(result);
        },
        (err) => {
            res.status(203).send(err);
        }
    );
};

exports.findAllIncidentResolutions = (req, res) => {
    IncidentResolutionModel.findAllIncidentResolutions().then(
        (result) => {
            res.status(200).send(result);
        },
        (err) => {
            res.status(203).send(err);
        }
    );
};