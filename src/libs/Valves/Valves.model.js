const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = require("../../configs/connection");
const Valves = require("../../models/Valves")(sequelize, Sequelize);

Valves.sync({ force: false });

function cleanData(obj) {
  for (const key in obj) {
    if (obj[key] === "" || obj[key] === null) {
      delete obj[key];
    }
  }
  return obj;
}

exports.createValve = (ValvesData) => {
  return new Promise(async (resolve, reject) => {
    ValvesData = cleanData(ValvesData);
    Valves.create(ValvesData).then(
      async (result) => {
        try {
          const id = result.dataValues.ID;
          const [data, dmeta] = await sequelize.query(
            `UPDATE public."Valves" SET "geom" = ST_SetSRID(ST_MakePoint("Longitude", "Latitude"), 4326) WHERE "ID" = '${id}';`
          );
          resolve({
            success: "Created successfully",
            token: result.dataValues.ID,
          });
        } catch (error) {
          if (
            error instanceof Sequelize.ValidationError ||
            error instanceof Sequelize.UniqueConstraintError
          ) {
            const detailMessages = error.errors.map((err) => err.message);
            reject({
              error:
                detailMessages.length > 0
                  ? detailMessages[0]
                  : "Unexpected error!",
            });
          } else {
            reject({
              error: error.message,
            });
          }
        }
      },
      (error) => {
        if (
          error instanceof Sequelize.ValidationError ||
          error instanceof Sequelize.UniqueConstraintError
        ) {
          const detailMessages = error.errors.map((err) => err.message);
          reject({
            error:
              detailMessages.length > 0
                ? detailMessages[0]
                : "Unexpected error!",
          });
        } else {
          reject({
            error: error.message,
          });
        }
      }
    );
  });
};

exports.findValveById = (id) => {
  return new Promise((resolve, reject) => {
    Valves.findByPk(id).then(
      (result) => {
        if (result == null) {
          reject({ status: 404, error: "Valve not found" });
        }
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findValveByName = (value) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, meta] = await sequelize.query(
        `SELECT * FROM "Valves" WHERE "Name" ILIKE '%${value}%'`
      );
      resolve(data);
    } catch (error) {
      console.log(error);

      reject({ error: "Retrieve Failed" });
    }
  });
};

exports.updateValveById = (ValvesData, id) => {
  ValvesData.id = id;
  return new Promise((resolve, reject) => {
    Valves.update(ValvesData, {
      where: {
        ID: id,
      },
    }).then(
      (result) => {
        resolve({ success: "Updated successfully", token: id });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.deleteValveById = (id) => {
  return new Promise((resolve, reject) => {
    Valves.destroy({
      where: {
        ID: id,
      },
    }).then(
      (result) => {
        if (result != 0) resolve({ success: "Deleted successfully!!!" });
        else reject({ error: "Valve does not exist!!!" });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findAllValves = () => {
  return new Promise((resolve, reject) => {
    Valves.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findValvesPagnited = (offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, meta] = await sequelize.query(
        `SELECT * FROM "Valves" ORDER BY "updatedAt" ASC LIMIT 12 OFFSET ${offset}  `
      );
      const [count, mdata] = await sequelize.query(
        `SELECT COUNT(*) FROM "Valves"`
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

exports.findValvesPagnitedSearch = (value, offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT * FROM "Valves" WHERE "Name" ILIKE '%${value}%' LIMIT 12 OFFSET ${offset}`
      );
      const [count, mdata] = await sequelize.query(
        `SELECT COUNT(*) FROM "Valves" WHERE "Name" ILIKE '%${value}%'`
      );
      resolve({
        data: result,
        total: count[0].count,
      });
    } catch (error) {
      reject({ error: "Retrieve failed!" });
    }
  });
};

exports.totalMapped = (offset) => {
  return new Promise((resolve, reject) => {
    Valves.findAll({}).then(
      async (result) => {
        const count = await Valves.count();
        resolve({
          success: count,
        });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.getGeoJSON = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const Valves = await sequelize.query(
        `SELECT *,ST_MakePoint("Longitude","Latitude") AS point FROM public."Valves"`,
        { type: QueryTypes.SELECT }
      );
      resolve(Valves);
    } catch (error) {
      reject({ error: "Retrieve failed" });
    }
  });
};
