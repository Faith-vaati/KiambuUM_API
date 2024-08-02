const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const Projects = require("../../models/Projects")(sequelize, Sequelize);
Projects.sync({ force: false });

exports.createProject = (ProjectsData) => {
  return new Promise(async (resolve, reject) => {
    Projects.create(ProjectsData).then(
      async (result) => {
        try {
          const id = result.dataValues.ID;
          const [data, dmeta] = await sequelize.query(
            `UPDATE public."Projects" SET "geom" = ST_SetSRID(ST_MakePoint("Longitude", "Latitude"), 4326) WHERE "ID" = '${id}';`
          );
          resolve({
            success: "Created successfully",
            token: result.dataValues.ID,
          });
        } catch (error) {
          reject({ success: "Data saved without geometry" });
        }
      },
      (err) => {
        reject({ error: "Project creation failed" });
      }
    );
  });
};

exports.findAllProjects = () => {
  return new Promise(async (resolve, reject) => {
    Projects.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
      
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findType = () => {
  return new Promise(async (resolve, reject) => {
    Projects.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("Type")), "Type"],
        [Sequelize.fn("COUNT", Sequelize.col("Type")), "count"],
      ],
      group: ["Type"],
    }).then(
      (result) => {
        resolve({
          result: result,
        });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findProjectsPaginated = (offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, meta] = await sequelize.query(
        `SELECT * FROM "Projects" ORDER BY "updatedAt" DESC LIMIT 12 OFFSET ${offset}`
      );
      const [count, mdata] = await sequelize.query(
        `SELECT COUNT(*) FROM "Projects"`
      );
      resolve({
        data: result,
        total: count[0].count,
      });
    } catch (error) {
      reject({ error: "Retrieve Failed!" });
    }
  });
};

exports.findProjectByID = (id) => {
  return new Promise((resolve, reject) => {
    Projects.findByPk(id).then(
      (result) => {
        if (result == null) {
          reject({ status: 404, message: "Data not found" });
        }
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.updateProjectByID = (ProjectsData, id) => {
  return new Promise((resolve, reject) => {
    Projects.update(ProjectsData, {
      where: {
        ID: id,
      },
    }).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject(err);
      }
    );
  });
};

exports.deleteProjectByID = (id) => {
  return new Promise((resolve, reject) => {
    Projects.destroy({
      where: {
        ID: id,
      },
    }).then(
      (result) => {
        if (result != 0) {
          resolve({ success: "Deleted Successfully!!!" });
        } else {
          reject({ error: "Entry does not exist!!!" });
        }
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findByKeyWord = (query, offset) => {
  return new Promise((resolve, reject) => {
    Projects.findAll({
      where: {
        KeyWords: {
          [Sequelize.Op.iLike]: `%${query}%`,
        },
      },
      offset: offset,
      limit: 12,
    }).then(
      (result) => {
        if (result == null) {
          reject({ status: 404, message: "Not found!!" });
        }
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.filterByYear = () => {
  return new Promise((resolve, reject) => {
    Projects.findAll({
      attributes: ["Year", "Type"],
      // group: ["Year"],
    }).then(
      (result) => {
        if (result == null) {
          reject({ status: 404, message: "Not Found!!!" });
        }
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findStats = () => {
  return new Promise((resolve, reject) => {
    Projects.findAll({}).then(
      async (result) => {
        const count = await Projects.count({});
        const clients = await Projects.count({
          col: "Client",
          distinct: true,
        });
        const type = await Projects.count({
          col: "Type",
          distinct: true,
        });
        const typeSum = await sequelize.query(
          `SELECT "Projects"."Type", COUNT(*) AS count FROM "Projects" GROUP BY "Projects"."Type"`
        );
        resolve({
          total: count,
          clients: clients,
          type: type,
          sum: typeSum,
        });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};
