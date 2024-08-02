const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = require("../../configs/connection");
const Washouts = require("../../models/Washouts")(sequelize, Sequelize);

Washouts.sync({ force: false });
exports.createWashout = (WashoutsData) => {
  return new Promise(async (resolve, reject) => {
    Washouts.create(WashoutsData).then(
      async (result) => {
        try {
          const id = result.dataValues.ID;
          const [data, dmeta] = await sequelize.query(
            `UPDATE public."Washouts" SET "geom" = ST_SetSRID(ST_MakePoint("Longitude", "Latitude"), 4326) WHERE "ID" = '${id}';`
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
        reject({ error: "Washout creation failed" });
      }
    );
  });
};

exports.findWashoutById = (id) => {
  return new Promise((resolve, reject) => {
    Washouts.findByPk(id).then(
      (result) => {
        if (result == null) {
          reject({ status: 404, error: "Washout not found" });
        }
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.updateWashoutById = (WashoutData, id) => {
  return new Promise((resolve, reject) => {
    Washouts.update(WashoutData, {
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

exports.deleteWashoutById = (id) => {
  return new Promise((resolve, reject) => {
    Washouts.destroy({
      where: {
        ID: id,
      },
    }).then(
      (result) => {
        if (result != 0) resolve({ success: "Deleted successfully!!!" });
        else reject({ error: "Washout does not exist!!!" });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findWashoutByObjectId = (id) => {
  return new Promise((resolve, reject) => {
    Washouts.findAll({
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

exports.findAllWashouts = () => {
  return new Promise((resolve, reject) => {
    Washouts.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findWashoutsPagnited = (offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, meta] = await sequelize.query(
        `SELECT * FROM "Washouts" ORDER BY "updatedAt" DESC LIMIT 12 OFFSET ${offset}`
      );
      const [count, mdata] = await sequelize.query(
        `SELECT COUNT(*) FROM "Washouts"`
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
    Washouts.findAll({}).then(
      async (result) => {
        const count = await Washouts.count();
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
        `SELECT *,ST_MakePoint("Longitude","Latitude") AS point FROM public."Washouts"`,
        { type: QueryTypes.SELECT }
      );
      resolve(users);
    } catch (error) {
      reject({ error: "Retrieve failed" });
    }
  });
};
