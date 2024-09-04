const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = require("../../configs/connection");
const Offtakers = require("../../models/Offtakers")(sequelize, Sequelize);

Offtakers.sync({ force: false });

function cleanData(obj) {
  for (const key in obj) {
    if (obj[key] === "" || obj[key] === null) {
      delete obj[key];
    }
  }
  return obj;
}

exports.createOfftakers = (OfftakersData) => {
  return new Promise(async (resolve, reject) => {
    OfftakersData = cleanData(OfftakersData);
    Offtakers.create(OfftakersData).then(
      async (result) => {
        try {
          const id = result.dataValues.ID;
          const [data, dmeta] = await sequelize.query(
            `UPDATE public."Offtakers" SET "geom" = ST_SetSRID(ST_MakePoint("Longitude", "Latitude"), 4326) WHERE "ID" = '${id}';`
          );
          resolve({
            success: "Offtakers Created successfully",
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

exports.findOfftakersById = (id) => {
  return new Promise((resolve, reject) => {
    Offtakers.findByPk(id).then(
      (result) => {
        if (result == null) {
          reject({ status: 404, error: "Offtakers not found" });
        }
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findOfftakersByName = (value) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, meta] = await sequelize.query(
        `SELECT * FROM "Offtakers" WHERE "Name" ILIKE '%${value}%'`
      );
      resolve(data);
    } catch (error) {
      console.log(error);

      reject({ error: "Retrieve Failed" });
    }
  });
};

exports.updateOfftakersById = (OfftakersData, id) => {
  OfftakersData = cleanData(OfftakersData);
  return new Promise((resolve, reject) => {
    Offtakers.update(OfftakersData, {
      where: {
        ID: id,
      },
    }).then(
      async (result) => {
        try {
          if (OfftakersData.Latitude && OfftakersData.Longitude) {
            const [data, dmeta] = await sequelize.query(
              `UPDATE public."Offtakers" SET "geom" = ST_SetSRID(ST_MakePoint("Longitude", "Latitude"), 4326) WHERE "ID" = '${id}';`
            );
          }
        } catch (error) {}
        resolve({ success: "Updated successfully", token: id });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.deleteOfftakersById = (id) => {
  return new Promise((resolve, reject) => {
    Offtakers.destroy({
      where: {
        ID: id,
      },
    }).then(
      (result) => {
        if (result != 0) resolve({ success: "Deleted successfully!!!" });
        else reject({ error: "Offtakers does not exist!!!" });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findAllOfftakers = () => {
  return new Promise((resolve, reject) => {
    Offtakers.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findOfftakersPagnited = (offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, meta] = await sequelize.query(
        `SELECT * FROM "Offtakers" ORDER BY "createdAt" ASC LIMIT 12 OFFSET ${offset}  `
      );
      const [count, mdata] = await sequelize.query(
        `SELECT COUNT(*) FROM "Offtakers"`
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

exports.findOfftakersPagnitedSearch = (column, value, offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT * FROM "Offtakers" WHERE "${column}" ILIKE '%${value}%' LIMIT 12 OFFSET ${offset}`
      );
      const [count, mdata] = await sequelize.query(
        `SELECT COUNT(*) FROM "Offtakers" WHERE "${column}" ILIKE '%${value}%'`
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

exports.searchOneOfftakers = (value) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT "Name","AccountNo", "Latitude", "Longitude" FROM "Offtakers" WHERE ("AccountNo" ILIKE '%${value}%' OR "Name" ILIKE '%${value}%') LIMIT 1 OFFSET 0`
      );
      resolve(result);
    } catch (error) {
      reject([]);
    }
  });
};

exports.searchOthers = (table, value) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT "ObjectID", "Name", "Latitude", "Longitude" FROM "${table}" WHERE ("ObjectID"::text ILIKE '%${value}%' OR "Name" ILIKE '%${value}%') LIMIT 1 OFFSET 0`
      );
      resolve(result);
    } catch (error) {
      reject([]);
    }
  });
};

exports.filterOfftakers = (column, operator, value, offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT * FROM "Offtakers" WHERE "${column}" ${operator} '${value}' LIMIT 12 OFFSET ${offset}`
      );

      const [count, cmetadata] = await sequelize.query(
        `SELECT Count(*)::int AS total FROM "Offtakers" WHERE "${column}" ${operator} '${value}'`
      );

      resolve({
        data: result,
        total: count[0].total,
      });
    } catch (error) {
      reject({ error: "Retrieve failed!" });
    }
  });
};

exports.totalMapped = (offset) => {
  return new Promise((resolve, reject) => {
    Offtakers.findAll({}).then(
      async (result) => {
        const count = await Offtakers.count();
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
        `SELECT *,ST_MakePoint("Longitude","Latitude") AS point FROM public."Offtakers"`,
        { type: QueryTypes.SELECT }
      );
      resolve(users);
    } catch (error) {
      reject({ error: "Retrieve failed" });
    }
  });
};

exports.getStats = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [cs, smeta] = await sequelize.query(
        `SELECT Count(*)::FLOAT as total FROM public."Offtakers"`
      );
      const [dm, hmeta] = await sequelize.query(
        `SELECT Count(DISTINCT "DMA")::FLOAT as total FROM public."Offtakers"`
      );
      const [zn, dmeta] = await sequelize.query(
        `SELECT Count(DISTINCT "Zone")::FLOAT as total FROM public."Offtakers"`
      );
      const [tnk, fmeta] = await sequelize.query(
        `SELECT Count(*)::FLOAT as total FROM public."Tanks"`
      );
      const [vl, imeta] = await sequelize.query(
        `SELECT Count(*)::FLOAT as total FROM public."Valves"`
      );
      const [mn, pmeta] = await sequelize.query(
        `SELECT Count(*)::FLOAT as total FROM public."Manholes"`
      );
      const [cb, cbmeta] = await sequelize.query(
        `SELECT SUM("Amount") as total FROM public."OfftakersBillings"`
      );
      const [inv, invmeta] = await sequelize.query(
        `SELECT SUM("Amount") as total FROM public."OfftakersBillings"`
        // ROUND( AVG(some_column)::numeric, 2 )
      );

      resolve({
        Offtakers: cs,
        DMA: dm,
        Zone: zn,
        Tanks: tnk,
        Valves: vl,
        Manholes: mn,
        CurrentBalance: cb,
        InvoiceAmount: inv,
      });
    } catch (error) {
      reject(null);
    }
  });
};

exports.findCharts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [accType, dmeta] = await sequelize.query(
        `SELECT "AccountType" AS name,Count(*)::int AS value FROM public."Offtakers" GROUP BY "AccountType"`
      );
      const [accStatus, ameta] = await sequelize.query(
        `SELECT "AccountStatus"  AS name,Count(*)::int  AS value FROM public."Offtakers" GROUP BY "AccountStatus"`
      );

      const [mtrStatus, mtrmeta] = await sequelize.query(
        `SELECT "MeterStatus"  AS name,Count(*)::int  AS value FROM public."Offtakers" GROUP BY "MeterStatus"`
      );
      const [dma, dmameta] = await sequelize.query(
        `SELECT "DMA"  AS name,Count(*)::int  AS value FROM public."Offtakers" GROUP BY "DMA"`
      );
      const [zone, znmeta] = await sequelize.query(
        `SELECT "Zone"  AS name,Count(*)::int  AS value FROM public."Offtakers" GROUP BY "Zone"`
      );
      const [mtrclass, clmeta] = await sequelize.query(
        `SELECT "Class"  AS name,Count(*)::int  AS value FROM public."Offtakers" GROUP BY "Class"`
      );

      resolve({
        AccountType: accType,
        AccountStatus: accStatus,
        MeterStatus: mtrStatus,
        DMA: dma,
        Zone: zone,
        Class: mtrclass,
      });
    } catch (error) {
      reject({ error: "failed" });
    }
  });
};
