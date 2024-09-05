const CategoriesModel = require("./Categories.model");

exports.create = (req, res) => {
  if (req.file) req.body.File = req.file.filename;
  CategoriesModel.createCategory(req.body).then(
    (result) => {
      res.status(200).send({ success: "Category Created Successfully" });
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findCategoriesById = (req, res) => {
  CategoriesModel.findCategoriesById(req.params.ID).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err.success);
    }
  );
};

exports.updateCategoriesById = (req, res) => {
  CategoriesModel.updateCategoriesById(req.body, req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
exports.deleteCategoryById = (req, res) => {

  CategoriesModel.deleteCategoryById(req.params.id).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
exports.findAllCategories = (req, res) => {
  CategoriesModel.findAllCategories().then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};

exports.findCategoriesPaginated = (req, res) => {
  CategoriesModel.findCategoriesPaginated(req.params.offset).then(
    (result) => {
      res.status(200).send(result);
    },
    (err) => {
      res.status(203).send(err);
    }
  );
};
