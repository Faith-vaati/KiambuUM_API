const BulkMetersModel = require("./BulkMeters.model");

exports.createBulkMeters = async (req, res) => {
    try {
        const result = await BulkMetersModel.createBulkMeters(req.body);
        res.status(201).send(result); 
    } catch (err) {
        res.status(400).send({ error: err.message || "Creation failed" });
    }
};


exports.updateBulkMeters = async (req, res) => {
    try {
        const affectedRows = await BulkMetersModel.updateBulkMetersByID(req.body, req.params.id);
        if (affectedRows === 0) { 
            return res.status(203).send({ error: "BulkMeters not found" }); 
        }
        res.status(200).send({ success: "Updated successfully" }); 
    } catch (err) {
        res.status(203).send({ error: err.message || "Update failed" }); 
    }
};


exports.getAllBulkMetersController = async (req, res) => {
    try {
        const result = await BulkMetersModel.getAllBulkMeters();
        res.status(200).send(result); 
    } catch (error) {
        res.status(500).send({ error: error.message || "An error occurred" }); 
    }
};

exports.deleteBulkMeters = async (req, res) => {
    try {
        const affectedRows = await BulkMetersModel.deleteBulkMetersByID(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).send({ error: "BulkMeters not found" });
        }
        res.status(200).send({ success: "Deleted successfully" });
    } catch (err) {
        res.status(400).send({ error: err.message || "Deletion failed" });
    }
};
