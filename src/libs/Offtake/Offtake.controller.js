const OfftakeModel = require("./Offtake.model");

exports.getAllOfftakeController = (req, res) => {
    OfftakeModel.getAllOfftake().then(
        (result) => {
            res.status(200).send(result);
        },
        (error) => {
            res.status(500).send({ error: error.message || "An error occurred" });
        }
    );
};
