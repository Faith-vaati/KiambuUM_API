const OfftakeModel = require("./Offtake.model");


exports.createOfftake = async (req, res) => {
    try {
        const result = await OfftakeModel.createOfftake(req.body);
        res.status(201).send(result); 
    } catch (err) {
        res.status(400).send({ error: err.message || "Creation failed" });
    }
};


exports.updateOfftake = async (req, res) => {
    try {
        const affectedRows = await OfftakeModel.updateOfftakeByID(req.body, req.params.id);
        if (affectedRows === 0) { 
            return res.status(203).send({ error: "Offtake not found" }); 
        }
        res.status(200).send({ success: "Updated successfully" }); 
    } catch (err) {
        res.status(203).send({ error: err.message || "Update failed" }); 
    }
};


exports.getAllOfftakeController = async (req, res) => {
    try {
        const result = await OfftakeModel.getAllOfftake();
        res.status(200).send(result); 
    } catch (error) {
        res.status(500).send({ error: error.message || "An error occurred" }); 
    }
};

exports.deleteOfftake = async (req, res) => {
    try {
        const affectedRows = await OfftakeModel.deleteOfftakeByID(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).send({ error: "Offtake not found" });
        }
        res.status(200).send({ success: "Deleted successfully" });
    } catch (err) {
        res.status(400).send({ error: err.message || "Deletion failed" });
    }
};
