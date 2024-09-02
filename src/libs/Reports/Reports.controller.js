const Reports = require("../../models/Reports");
const ReportsModel = require("./Reports.model");

exports.insert = (req, res) => {
  ReportsModel.createReport(req.body).then(
    (result) => {
      res.status(200).send({ success: "Report Submitted Successfully" });
    },
    (err) => {
      console.log(err);
      res.status(203).send(err);
    }
  );
};

exports.findAllReports = (req, res) => {
  ReportsModel.findAllReports().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.getStatusByID = (req, res) => {
  ReportsModel.getStatusByID(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findReportsJoined = (req, res) => {
  ReportsModel.findReportsJoined(req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findReportsPaginated = (req, res) => {
  ReportsModel.findReportsPaginated(req.params.type).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findAssignedReportsPaginated = (req, res) => {
  ReportsModel.findAssignedReportsPaginated(
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

exports.findReportsnTasksPaginated = (req, res) => {
  ReportsModel.findReportsnTasksPaginated(req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findStats = (req, res) => {
  ReportsModel.findStats().then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.findType = (req, res) => {
  ReportsModel.findType().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findStatus = (req, res) => {
  ReportsModel.findStatus().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findStatusByType = (req, res) => {
  ReportsModel.findStatusByType(req.params.type).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findReportByStatus = (req, res) => {
  ReportsModel.findReportByStatus(req.params.status, req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findMonthly = (req, res) => {
  ReportsModel.findMonthly().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findByType = (req, res) => {
  ReportsModel.findReportByType(req.params.type, req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findAllReportByType = (req, res) => {
  ReportsModel.findAllReportByType(req.params.type).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findReportByID = (req, res) => {
  ReportsModel.findReportByID(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.updateReportByID = (req, res) => {
  ReportsModel.updateReportByID(req.body, req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.deleteReportByID = (req, res) => {
  ReportsModel.deleteReportByID(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findByKeyword = (req, res) => {
  ReportsModel.findByKeyWord(req.params.query, req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.filterByYear = (req, res) => {
  ReportsModel.filterByYear().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.findReportTypeCount = (req, res) => {
  ReportsModel.findReportTypeCount(req.params.type).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.countEachType = (req, res) => {
  ReportsModel.countEachType(req.params.type).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.getStats = (req, res) => {
  ReportsModel.getStats(req.params.start, req.params.end).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findCharts = (req, res) => {
  ReportsModel.findCharts(req.params.start, req.params.end).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findAllReportsPaginated = (req, res) => {
  ReportsModel.findAllReportsPaginated(req.params.type, req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findGeojson = (req, res) => {
  ReportsModel.findGeojson(req.params.type).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};


exports.searchReports = (req, res) => {
  ReportsModel.searchReports(req.params.col, req.params.val).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.paginatedSearchReports = (req, res) => {
  ReportsModel.paginatedSearchReports(
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
  ReportsModel.searchFacility(req.params.value).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.filterReports = (req, res) => {
  ReportsModel.filterReports(
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

exports.paginatedFilterReports = (req, res) => {
  ReportsModel.paginatedFilterReports(
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

exports.getReportsReportedByUserId = (req, res) => {
  ReportsModel.getReportsReportedByUserId(
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
  ReportsModel.searchIncident(req.params.value).then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};
