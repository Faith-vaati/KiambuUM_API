const CustomerChamberModel = require("./CustomerChamber.model");


exports.createCustomerChamber = async (req, res) => {
    try {
        const result = await CustomerChamberModel.createCustomerChamber(req.body);
        res.status(201).send(result); 
    } catch (err) {
        res.status(400).send({ error: err.message || "Creation failed" });
    }
};


exports.updateCustomerChamber = async (req, res) => {
    try {
        const affectedRows = await CustomerChamberModel.updateCustomerChamberByID(req.body, req.params.id);
        if (affectedRows === 0) { 
            return res.status(203).send({ error: "CustomerChamber not found" }); 
        }
        res.status(200).send({ success: "Updated successfully" }); 
    } catch (err) {
        res.status(203).send({ error: err.message || "Update failed" }); 
    }
};


exports.getAllCustomerChamberController = async (req, res) => {
    try {
        const result = await CustomerChamberModel.getAllCustomerChamber();
        res.status(200).send(result); 
    } catch (error) {
        res.status(500).send({ error: error.message || "An error occurred" }); 
    }
};

exports.deleteCustomerChamber = async (req, res) => {
    try {
        const affectedRows = await CustomerChamberModel.deleteCustomerChamberByID(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).send({ error: "CustomerChamber not found" });
        }
        res.status(200).send({ success: "Deleted successfully" });
    } catch (err) {
        res.status(400).send({ error: err.message || "Deletion failed" });
    }
};
