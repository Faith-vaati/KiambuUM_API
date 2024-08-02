const ProjectsModel = require("./Projects.model");

exports.insert = (req, res) => {
  ProjectsModel.createProject(req.body).then(
    (result) => {
      res.status(200).send({ success: "Project Created Successfully" });
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findAllProjects = (req, res) => {
  ProjectsModel.findAllProjects().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findProjectsPaginated = (req, res) => {
  ProjectsModel.findProjectsPaginated().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findStats = (req, res) => {
  ProjectsModel.findStats().then(
    (result) => {
      res.status(200).send(result);
    },
    (error) => {
      res.status(203).send(error);
    }
  );
};

exports.findType = (req, res) => {
  ProjectsModel.findType().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findByType = (req, res) => {
  ProjectsModel.findProjectByType(req.params.type, req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findProjectByID = (req, res) => {
  ProjectsModel.findProjectByID(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.updateProjectByID = (req, res) => {
  ProjectsModel.updateProjectByID(req.body, req.params.ProjectID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.deleteProjectByID = (req, res) => {
  ProjectsModel.deleteProjectByID(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findByKeyword = (req, res) => {
  ProjectsModel.findByKeyWord(req.params.query, req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};

exports.filterByYear = (req, res) => {
  ProjectsModel.filterByYear().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.message);
    }
  );
};
