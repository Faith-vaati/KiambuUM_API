const NRWLeakages = require("../../models/NRWLeakages");
const NRWLeakagesModel = require("./NRWLeakages.model");

exports.insert = (req, res) => {
  NRWLeakagesModel.createNRWLeakage(req.body).then(
    (result) => {
      res.status(200).send({ success: "NRWLeakage Submitted Successfully" });
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findAllNRWLeakages = (req, res) => {
  NRWLeakagesModel.findAllNRWLeakages().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.getStatusByID = (req, res) => {
  NRWLeakagesModel.getStatusByID(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findNRWLeakagesJoined = (req, res) => {
  NRWLeakagesModel.findNRWLeakagesJoined(req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findNRWLeakagesPaginated = (req, res) => {
  NRWLeakagesModel.findNRWLeakagesPaginated(req.params.type).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findAssignedNRWLeakagesPaginated = (req, res) => {
  NRWLeakagesModel.findAssignedNRWLeakagesPaginated(
    req.params.nrwId,
    req.params.offset
  ).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findNRWLeakagesnTasksPaginated = (req, res) => {
  NRWLeakagesModel.findNRWLeakagesnTasksPaginated(req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findStats = (req, res) => {
  NRWLeakagesModel.findStats().then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.findStatusCountByType = (req, res) => {
  NRWLeakagesModel.findStatusCountByType(req.params.type).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.findMonthlyCountByType = (req, res) => {
  NRWLeakagesModel.findMonthlyCountByType(req.params.type).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.findType = (req, res) => {
  NRWLeakagesModel.findType().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findStatus = (req, res) => {
  NRWLeakagesModel.findStatus().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findStatusByType = (req, res) => {
  NRWLeakagesModel.findStatusByType(req.params.type).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findNRWLeakageByStatus = (req, res) => {
  NRWLeakagesModel.findNRWLeakageByStatus(
    req.params.status,
    req.params.offset
  ).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findMonthly = (req, res) => {
  NRWLeakagesModel.findMonthly().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findByType = (req, res) => {
  NRWLeakagesModel.findNRWLeakageByType(
    req.params.type,
    req.params.offset
  ).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findAllNRWLeakageByType = (req, res) => {
  NRWLeakagesModel.findAllNRWLeakageByType(req.params.type).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findNRWLeakageByID = (req, res) => {
  NRWLeakagesModel.findNRWLeakageByID(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.updateNRWLeakageByID = (req, res) => {
  NRWLeakagesModel.updateNRWLeakageByID(req.body, req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.deleteNRWLeakageByID = (req, res) => {
  NRWLeakagesModel.deleteNRWLeakageByID(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findByKeyword = (req, res) => {
  NRWLeakagesModel.findByKeyWord(req.params.query, req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.filterByYear = (req, res) => {
  NRWLeakagesModel.filterByYear().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.findNRWLeakageTypeCount = (req, res) => {
  NRWLeakagesModel.findNRWLeakageTypeCount(req.params.type).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.countEachType = (req, res) => {
  NRWLeakagesModel.countEachType(req.params.type).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.getStats = (req, res) => {
  NRWLeakagesModel.getStats(req.params.start, req.params.end).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findCharts = (req, res) => {
  NRWLeakagesModel.findCharts(req.params.start, req.params.end).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findAllNRWLeakagesPaginated = (req, res) => {
  NRWLeakagesModel.findAllNRWLeakagesPaginated(
    req.params.type,
    req.params.offset
  ).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findGeojson = (req, res) => {
  NRWLeakagesModel.findGeojson(req.params.type).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.searchNRWLeakages = (req, res) => {
  NRWLeakagesModel.searchNRWLeakages(req.params.col, req.params.val).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.paginatedSearchNRWLeakages = (req, res) => {
  NRWLeakagesModel.paginatedSearchNRWLeakages(
    req.params.column,
    req.params.value,
    req.params.offset
  ).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.searchFacility = (req, res) => {
  NRWLeakagesModel.searchFacility(req.params.value).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.filterNRWLeakages = (req, res) => {
  NRWLeakagesModel.filterNRWLeakages(
    req.params.column,
    req.params.operator,
    req.params.value
  ).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.paginatedFilterNRWLeakages = (req, res) => {
  NRWLeakagesModel.paginatedFilterNRWLeakages(
    req.params.column,
    req.params.operator,
    req.params.value,
    req.params.offset
  ).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.getNRWLeakagesNRWLeakageedByUserId = (req, res) => {
  NRWLeakagesModel.getNRWLeakagesNRWLeakageedByUserId(
    req.params.id,
    req.params.offset
  ).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.searchIncident = (req, res) => {
  NRWLeakagesModel.searchIncident(req.params.value).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.findDistributionByDMA = (req, res) => {
  NRWLeakagesModel.findDistributionByDMA().then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};
