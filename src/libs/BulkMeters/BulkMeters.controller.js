const BulkMetersModel = require("./BulkMeters.models");

exports.getAllBulkMetersController = (req, res) => {
    BulkMetersModel.getAllBulkMeters().then(
        (result) => {
            res.status(200).send(result);
        },
        (error) => {
            res.status(203).send(error);
        }
    );
};