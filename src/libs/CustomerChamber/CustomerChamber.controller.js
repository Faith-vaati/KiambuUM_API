const CustomerChamberModel = require("./CustomerChamber.model");

exports.getAllCustomerChamberController = (req, res) => {
    CustomerChamberModel.getAllCustomerChamber().then(
        (result) => {
            res.status(200).send(result);
        },
        (error) => {
            res.status(500).send({ error: error.message || "An error occurred" });
        }
    );
};
