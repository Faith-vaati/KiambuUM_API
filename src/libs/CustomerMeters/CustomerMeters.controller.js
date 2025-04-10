const CustomerModel = require("./Customer.model");

exports.create = (req, res) => {
  CustomerModel.createCustomer(req.body).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findCustomerById = (req, res) => {
  CustomerModel.findCustomerById(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.findCustomerByAccount = (req, res) => {
  CustomerModel.findCustomerByAccount(req.params.Account).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.updateCustomerById = (req, res) => {
  CustomerModel.updateCustomerById(req.body, req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },

    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.deleteCustomerById = (req, res) => {
  CustomerModel.deleteCustomerById(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findAllCustomers = (req, res) => {
  CustomerModel.findAllCustomers().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findCustomersPagnited = (req, res) => {
  CustomerModel.findCustomersPagnited(req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findCustomersPagnitedSearch = (req, res) => {
  CustomerModel.findCustomersPagnitedSearch(
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

exports.searchOneCustomer = (req, res) => {
  CustomerModel.searchOneCustomer(req.params.value).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.searchOthers = (req, res) => {
  CustomerModel.searchOthers(req.params.table, req.params.value).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.filterCustomers = (req, res) => {
  CustomerModel.filterCustomers(
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

exports.totalMapped = (req, res) => {
  CustomerModel.totalMapped().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.getGeoJSON = (req, res) => {
  CustomerModel.getGeoJSON().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.getStats = (req, res) => {
  CustomerModel.getStats().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findCharts = (req, res) => {
  CustomerModel.findCharts().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.getMeterTypes = (req, res) => {
  CustomerModel.getMeterTypes()
    .then((result) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result || []);
    })
    .catch((err) => {
      console.error("Get meter types error:", err);
      res.setHeader("Content-Type", "application/json");
      res.status(203).json({
        error: err.error || "Failed to retrieve meter types",
        details: err.details || err.message,
      });
    });
};

exports.getSummaryStats = (req, res) => {
  console.log("getSummaryStats controller called");
  CustomerModel.getSummaryStats().then(
    (result) => {
      console.log("Summary stats result:", result);
      res.status(200).send(result);
    },
    (err) => {
      console.error("Summary stats error:", err);
      res.status(203).send(err);
    }
  );
};

exports.getMeterStatus = (req, res) => {
  const year = parseInt(req.query.year) || new Date().getFullYear();

  CustomerModel.getMeterStatus(year)
    .then((result) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result || []);
    })
    .catch((err) => {
      console.error("Get meter status error:", err);
      res.setHeader("Content-Type", "application/json");
      res.status(400).json({
        error: err.error || "Failed to retrieve meter status",
        details: err.details || err.message,
      });
    });
};
