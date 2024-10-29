const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const NewWaterConnections = require("../../models/NewWaterConnections")(
  sequelize,
  Sequelize
);
NewWaterConnections.sync({ force: false });

exports.createNewWaterConnection = (NewWaterConnectionsData) => {
  return new Promise(async (resolve, reject) => {
    NewWaterConnections.create(NewWaterConnectionsData).then(
      async (result) => {
        try {
          const id = result.dataValues.ID;
          const [data, dmeta] = await sequelize.query(
            `UPDATE "NewWaterConnections" SET "geom" = ST_SetSRID(ST_MakePoint("Longitude", "Latitude"), 4326) WHERE "ID" = '${id}';`
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
        reject({ error: "NewWaterConnection creation failed" });
      }
    );
  });
};

exports.findAllNewWaterConnections = () => {
  return new Promise(async (resolve, reject) => {
    NewWaterConnections.findAll({}).then(
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
    NewWaterConnections.findAll({
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

exports.findNewWaterConnectionsPaginated = (offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, meta] = await sequelize.query(
        `SELECT * FROM "NewWaterConnections" ORDER BY "updatedAt" DESC LIMIT 12 OFFSET ${offset}`
      );
      const [count, mdata] = await sequelize.query(
        `SELECT COUNT(*) FROM "NewWaterConnections"`
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

exports.findNewWaterConnectionByID = (id) => {
  return new Promise((resolve, reject) => {
    NewWaterConnections.findByPk(id).then(
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

exports.updateNewWaterConnectionByID = (NewWaterConnectionsData, id) => {
  return new Promise((resolve, reject) => {
    NewWaterConnections.update(NewWaterConnectionsData, {
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

exports.deleteNewWaterConnectionByID = (id) => {
  return new Promise((resolve, reject) => {
    NewWaterConnections.destroy({
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
    NewWaterConnections.findAll({
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
    NewWaterConnections.findAll({
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
    NewWaterConnections.findAll({}).then(
      async (result) => {
        const count = await NewWaterConnections.count({});
        const clients = await NewWaterConnections.count({
          col: "Client",
          distinct: true,
        });
        const type = await NewWaterConnections.count({
          col: "Type",
          distinct: true,
        });
        const typeSum = await sequelize.query(
          `SELECT "NewWaterConnections"."Type", COUNT(*) AS count FROM "NewWaterConnections" GROUP BY "NewWaterConnections"."Type"`
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

exports.searchWaterConnection = (value) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT * FROM "NewWaterConnections" WHERE ("AccountNo"::text ILIKE '%${value}%') LIMIT 1 OFFSET 0`
      );
      console.log("WaterConnection is " + resolve);

      resolve(result);
    } catch (error) {
      console.log(error);

      reject([]);
    }
  });
};
