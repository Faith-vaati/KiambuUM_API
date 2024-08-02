const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = require("../../configs/connection");
const Tanks = require("../../models/Tanks")(sequelize, Sequelize);
const Path = require("path");

Tanks.sync({ force: false });
exports.createTank = (TanksData) => {
  return new Promise(async (resolve, reject) => {
    if (TanksData.Longitude === undefined || TanksData.Latitude === undefined) {
      reject({ error: "Location is required" });
    }

    Tanks.create(TanksData).then(
      async (result) => {
        try {
          const id = result.dataValues.ID;
          const [data, dmeta] = await sequelize.query(
            `UPDATE public."Tanks" SET "geom" = ST_SetSRID(ST_MakePoint("Longitude","Latitude"), 4326) WHERE "ID" = '${id}';`
          );
          resolve({
            success: "Tank Created successfully",
            token: result.dataValues.ID,
          });
        } catch (error) {
          reject({ success: "Data saved without geometry" });
        }
      },
      (err) => {
        reject({ error: "Tank creation failed" });
      }
    );
  });
};

exports.TankById = (id) => {
  return new Promise((resolve, reject) => {
    Tanks.findByPk(id).then(
      (result) => {
        if (result == null) {
          reject({ status: 404, error: "Tank not found" });
        }
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findTankByObjectId = (id) => {
  return new Promise((resolve, reject) => {
    Tanks.findAll({
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

exports.updateTankById = (TanksData, id) => {
  TanksData.id = id;
  return new Promise((resolve, reject) => {
    Tanks.update(TanksData, {
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

exports.deleteTankById = (id) => {
  return new Promise((resolve, reject) => {
    Tanks.destroy({
      where: {
        ID: id,
      },
    }).then(
      (result) => {
        if (result != 0) resolve({ success: "Deleted successfully!!!" });
        else reject({ error: "Tank does not exist!!!" });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findAllTanks = () => {
  return new Promise((resolve, reject) => {
    Tanks.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findTanksPagnited = (offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, meta] = await sequelize.query(
        `SELECT * FROM "Tanks" ORDER BY "updatedAt" ASC LIMIT 12 OFFSET ${offset}  `
      );
      const [count, mdata] = await sequelize.query(
        `SELECT COUNT(*) FROM "Tanks"`
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

exports.findTanksPagnitedSearch = (column, value, offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT * FROM "Tanks" WHERE "${column}" ILIKE '%${value}%' LIMIT 12 OFFSET ${offset}`
      );
      const [count, mdata] = await sequelize.query(
        `SELECT COUNT(*) FROM "Tanks" WHERE "${column}" ILIKE '%${value}%'`
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
    Tanks.findAll({}).then(
      async (result) => {
        const count = await Tanks.count();
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
      const Tanks = await sequelize.query(
        `SELECT *,ST_MakePoint("Longitude","Latitude") AS point FROM public."Tanks"`,
        { type: QueryTypes.SELECT }
      );
      resolve(Tanks);
    } catch (error) {
      reject({ error: "Retrieve failed" });
    }
  });
};
