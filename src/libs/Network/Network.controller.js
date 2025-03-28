const NetworkModel = require("./Network.model");

exports.getNetworkStats = (req, res) => {
  // Set a timeout of 30 seconds
  const timeout = setTimeout(() => {
    res.status(504).send({ 
      error: "Request timeout", 
      message: "The request took too long to process" 
    });
  }, 30000);

  NetworkModel.getNetworkStats()
    .then((result) => {
      clearTimeout(timeout);
      res.status(200).send(result);
    })
    .catch((err) => {
      clearTimeout(timeout);
      console.error('Network stats error:', err);
      res.status(400).send({
        error: err.error || "Failed to retrieve network statistics",
        details: err.details || err.message
      });
    });
}; 