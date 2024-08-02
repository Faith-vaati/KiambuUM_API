const IncidentResolutionController = require('./IncidentResolution.controller');
const IncidentResolutionModel = require('./IncidentResolution.model');
const verifyToken = require('../Auth/VerifyToken');

exports.IncidentResolutionRoutes = function (app) {
    app.post('/incidentresolution/create', [
        IncidentResolutionModel.uploadFile, IncidentResolutionController.create]);

    app.get('/incidentresolution/:id', [IncidentResolutionController.findIncidentResolutionById]);

    app.get('/incidentresolution/reports/:id', [IncidentResolutionController.findByReportsID]);

    app.put('/incidentresolution/:id', [IncidentResolutionController.updateIncidentResolutionById]);

    app.delete('/incidentresolution/:id', [IncidentResolutionController.deleteIncidentResolutionById]);

    app.get('/incidentresolution', [IncidentResolutionController.findAllIncidentResolutions]);
};