const CustomerBillingModel = require("./CustomerBilling.model");

exports.insert = (req, res) => {
  CustomerBillingModel.createCustomerBilling(req.body).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findCustomerBillingById = (req, res) => {
  CustomerBillingModel.findCustomerBillingById(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.success);
    }
  );
};
exports.updateCustomerBillingById = (req, res) => {
  CustomerBillingModel.updateCustomerBillingById(req.body, req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
exports.deleteCustomerBillingById = (req, res) => {
  CustomerBillingModel.deleteCustomerBillingById(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
exports.findAllCustomerBilling = (req, res) => {
  CustomerBillingModel.findAllCustomerBilling().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findCustomerBillingPaginated = (req, res) => {
  CustomerBillingModel.findCustomerBillingPaginated(req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findCustomersPagnitedSearch = (req, res) => {
  CustomerBillingModel.findCustomersPagnitedSearch(
    req.params.value,
    req.params.column,
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

//new
exports.findManagementData = (req, res) => {
  CustomerBillingModel.findManagementData(req).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

//new
exports.findMapData = (req, res) => {
  CustomerBillingModel.findMapData(req).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findCharts = (req, res) => {
  CustomerBillingModel.findCharts(req.params.year).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findStats = (req, res) => {
  CustomerBillingModel.findStats().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findCustomerBilling = (req, res) => {
  CustomerBillingModel.findCustomerBilling().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findCustomerBillingFilter = (req, res) => {
  CustomerBillingModel.findCustomerBillingfilter(
    req.params.table,
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

exports.filterBilling = (req, res) => {
  CustomerBillingModel.filterBilling(
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
