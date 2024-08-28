const ConnectionChamberModel = require("./ConnectionChamber.model");


exports.createConnectionChamber = async (req, res) => {
    try {
        const result = await ConnectionChamberModel.createConnectionChamber(req.body);
        res.status(201).send(result); 
    } catch (err) {
        res.status(400).send({ error: err.message || "Creation failed" });
    }
};


exports.updateConnectionChamber = async (req, res) => {
    try {
        const affectedRows = await ConnectionChamberModel.updateConnectionChamberByID(req.body, req.params.id);
        if (affectedRows === 0) { 
            return res.status(203).send({ error: "ConnectionChamber not found" }); 
        }
        res.status(200).send({ success: "Updated successfully" }); 
    } catch (err) {
        res.status(203).send({ error: err.message || "Update failed" }); 
    }
};


exports.getAllConnectionChamberController = async (req, res) => {
    try {
        const result = await ConnectionChamberModel.getAllConnectionChamber();
        res.status(200).send(result); 
    } catch (error) {
        res.status(500).send({ error: error.message || "An error occurred" }); 
    }
};

exports.deleteConnectionChamber = async (req, res) => {
    try {
        const affectedRows = await ConnectionChamberModel.deleteConnectionChamberByID(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).send({ error: "ConnectionChamber not found" });
        }
        res.status(200).send({ success: "Deleted successfully" });
    } catch (err) {
        res.status(400).send({ error: err.message || "Deletion failed" });
    }
};
