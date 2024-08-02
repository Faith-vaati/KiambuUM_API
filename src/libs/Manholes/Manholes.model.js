const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = require("../../configs/connection");
const Manholes = require("../../models/Manholes")(sequelize, Sequelize);
const Path = require("path");

Manholes.sync({ force: false });
exports.createManhole = (ManholesData) => {
  return new Promise(async (resolve, reject) => {
    if (
      ManholesData.Latitude === undefined ||
      ManholesData.Longitude === undefined
    ) {
      reject({ error: "Location is required" });
    }
    Manholes.create(ManholesData).then(
      async (result) => {
        try {
          const id = result.dataValues.ID;
          const [data, dmeta] = await sequelize.query(
            `UPDATE public."Manholes" SET "geom" = ST_SetSRID(ST_MakePoint("Longitude", "Latitude"), 4326) WHERE "ID" = '${id}';`
          );
          resolve({
            success: "Created successfully",
            token: result.dataValues.ObjectID,
          });
        } catch (error) {
          reject({ success: "Data saved without geometry" });
        }
      },
      (err) => {
        reject({ error: "Manhole creation failed" });
      }
    );
  });
};

exports.findManholeById = (id) => {
  return new Promise((resolve, reject) => {
    Manholes.findByPk(id).then(
      (result) => {
        if (result == null) {
          reject({ status: 404, error: "Manhole not found" });
        }
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.updateManholeById = (ManholeData, id) => {
  return new Promise((resolve, reject) => {
    Manholes.update(ManholeData, {
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

exports.deleteManholeById = (id) => {
  return new Promise((resolve, reject) => {
    Manholes.destroy({
      where: {
        ID: id,
      },
    }).then(
      (result) => {
        if (result != 0) resolve({ success: "Deleted successfully!!!" });
        else reject({ error: "Manhole does not exist!!!" });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findManholeByObjectId = (id) => {
  return new Promise((resolve, reject) => {
    Manholes.findAll({
      where: {
        ObjectID: id,
      },
    }).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findAllManholes = () => {
  return new Promise((resolve, reject) => {
    Manholes.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findManholesPagnited = (offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, meta] = await sequelize.query(
        `SELECT * FROM "Manholes" ORDER BY "updatedAt" DESC LIMIT 12 OFFSET ${offset}`
      );
      const [count, mdata] = await sequelize.query(
        `SELECT COUNT(*) FROM "Manholes"`
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

exports.totalMapped = (offset) => {
  return new Promise((resolve, reject) => {
    Manholes.findAll({}).then(
      async (result) => {
        const count = await Manholes.count();
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
      const users = await sequelize.query(
        `SELECT *,ST_MakePoint("Longitude","Latitude") AS point FROM public."Manholes"`,
        { type: QueryTypes.SELECT }
      );
      resolve(users);
    } catch (error) {
      reject({ error: "Retrieve failed" });
    }
  });
};
