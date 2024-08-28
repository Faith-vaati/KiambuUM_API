const SewerMainTrunkModel = require("./SewerMainTrunk.model");


exports.createSewerMainTrunk = async (req, res) => {
    try {
        const result = await SewerMainTrunkModel.createSewerMainTrunk(req.body);
        res.status(201).send(result); 
    } catch (err) {
        res.status(400).send({ error: err.message || "Creation failed" });
    }
};


exports.updateSewerMainTrunk = async (req, res) => {
    try {
        const affectedRows = await SewerMainTrunkModel.updateSewerMainTrunkByID(req.body, req.params.id);
        if (affectedRows === 0) { 
            return res.status(203).send({ error: "SewerMainTrunk not found" }); 
        }
        res.status(200).send({ success: "Updated successfully" }); 
    } catch (err) {
        res.status(203).send({ error: err.message || "Update failed" }); 
    }
};


exports.getAllSewerMainTrunkController = async (req, res) => {
    try {
        const result = await SewerMainTrunkModel.getAllSewerMainTrunk();
        res.status(200).send(result); 
    } catch (error) {
        res.status(500).send({ error: error.message || "An error occurred" }); 
    }
};

exports.deleteSewerMainTrunk = async (req, res) => {
    try {
        const affectedRows = await SewerMainTrunkModel.deleteSewerMainTrunkByID(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).send({ error: "SewerMainTrunk not found" });
        }
        res.status(200).send({ success: "Deleted successfully" });
    } catch (err) {
        res.status(400).send({ error: err.message || "Deletion failed" });
    }
};
