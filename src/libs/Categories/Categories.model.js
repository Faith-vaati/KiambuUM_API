const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const Categories = require("../../models/Categories")(sequelize, Sequelize);

const multer = require("multer");
const Path = require("path");

Categories.sync({ force: false });

let upload = multer({
  limits: { fileSize: 100000000 },
  fileFilter: (req, file, callback) => {
    const acceptableExtensions = [".jpg", ".jpeg", ".png"];
    if (!acceptableExtensions.includes(Path.extname(file.originalname))) {
      return callback(new Error("Unsupported format"));
    }
    const fileSize = parseInt(req.headers["content-length"]);
    if (fileSize > 100000000) {
      return callback(new Error("File is too Large!"));
    }
    callback(null, true);
  },
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: function (req, file, callback) {
      callback(null, Date.now() + file.originalname);
    },
  }),
});

exports.uploadFile = upload.single("File");

exports.createCategory = (CategoriesData) => {
  return new Promise(async (resolve, reject) => {
    if (CategoriesData.Status == undefined) {
      return reject({ message: "Body is required!!!" });
    }
    Categories.create(CategoriesData).then(
      (result) => {
        resolve({ success: "Created Successfully" });
      },
      (error) => {
        reject({ error: "Creation Failed!!!" });
      }
    );
  });
};

exports.findCategoriesById = (id) => {
  return new Promise((resolve, reject) => {
    Categories.findByPk(id).then(
      (result) => {
        if (result == null) {
          reject({ error: "Not found" });
        }
        resolve(result);
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.updateCategoriesById = (CategoriesData, id) => {
  return new Promise((resolve, reject) => {
    Categories.update(CategoriesData, {
      where: {
        ID: id,
      },
    }).then(
      (result) => {
        resolve({ success: "Updated successfully!" });
      },
      (err) => {
        reject({ error: "Update failed!" });
      }
    );
  });
};

exports.deleteCategoryById = (id) => {
  return new Promise((resolve, reject) => {
    Categories.destroy({
      where: {
        ID: id,
      },
    }).then(
      (result) => {
        if (result != 0) resolve({ success: "Deleted successfully!!!" });
        else reject({ error: "Category does not exist!!!" });
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.findAllCategories = () => {
  return new Promise((resolve, reject) => {
    Categories.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.findCategoriesPaginated = (offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [results, metadata] = await sequelize.query(
        `SELECT * FROM "Categories"  ORDER BY "createdAt" LIMIT 12 OFFSET ${offset}`
      );
      const [count, cmeta] = await sequelize.query(
        `SELECT Count(*)::int AS total FROM "Categories"`
      );
      resolve({
        data: results,
        total: count[0].total,
      });
    } catch (error) {
      reject({ error: "Retrieve failed" });
    }
  });
};
