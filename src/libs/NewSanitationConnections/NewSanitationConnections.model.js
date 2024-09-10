const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const NewSanitationConnections = require("../../models/NewSanitationConnections")(sequelize, Sequelize);
NewSanitationConnections.sync({ force: false });

exports.createNewSanitationConnection = (NewSanitationConnectionsData) => {
  return new Promise(async (resolve, reject) => {
    NewSanitationConnections.create(NewSanitationConnectionsData).then(
      async (result) => {
        try {
          const id = result.dataValues.ID;
          const [data, dmeta] = await sequelize.query(
            `UPDATE public."NewSanitationConnections" SET "geom" = ST_SetSRID(ST_MakePoint("Longitude", "Latitude"), 4326) WHERE "ID" = '${id}';`
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
        reject({ error: "NewSanitationConnection creation failed" });
      }
    );
  });
};

exports.findAllNewSanitationConnections = () => {
  return new Promise(async (resolve, reject) => {
    NewSanitationConnections.findAll({}).then(
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
    NewSanitationConnections.findAll({
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

exports.findNewSanitationConnectionsPaginated = (offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, meta] = await sequelize.query(
        `SELECT * FROM "NewSanitationConnections" ORDER BY "updatedAt" DESC LIMIT 12 OFFSET ${offset}`
      );
      const [count, mdata] = await sequelize.query(
        `SELECT COUNT(*) FROM "NewSanitationConnections"`
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

exports.findNewSanitationConnectionByID = (id) => {
  return new Promise((resolve, reject) => {
    NewSanitationConnections.findByPk(id).then(
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

exports.updateNewSanitationConnectionByID = (NewSanitationConnectionsData, id) => {
  return new Promise((resolve, reject) => {
    NewSanitationConnections.update(NewSanitationConnectionsData, {
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

exports.deleteNewSanitationConnectionByID = (id) => {
  return new Promise((resolve, reject) => {
    NewSanitationConnections.destroy({
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
    NewSanitationConnections.findAll({
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
    NewSanitationConnections.findAll({
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
    NewSanitationConnections.findAll({}).then(
      async (result) => {
        const count = await NewSanitationConnections.count({});
        const clients = await NewSanitationConnections.count({
          col: "Client",
          distinct: true,
        });
        const type = await NewSanitationConnections.count({
          col: "Type",
          distinct: true,
        });
        const typeSum = await sequelize.query(
          `SELECT "NewSanitationConnections"."Type", COUNT(*) AS count FROM "NewSanitationConnections" GROUP BY "NewSanitationConnections"."Type"`
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
