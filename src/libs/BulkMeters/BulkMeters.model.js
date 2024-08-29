const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = require("../../configs/connection");
const BulkMeters = require("../../models/BulkMeters")(sequelize, Sequelize);

BulkMeters.sync({ force: false });
exports.createBulkMeters = (BulkMetersData) => {
  return new Promise(async (resolve, reject) => {
    if (BulkMetersData.Longitude === undefined || BulkMetersData.Latitude === undefined) {
      reject({ error: "Location is required" });
    }

    BulkMeters.create(BulkMetersData).then(
      async (result) => {
        try {
          const id = result.dataValues.ID;
          const [data, dmeta] = await sequelize.query(
            `UPDATE public."BulkMeters" SET "geom" = ST_SetSRID(ST_MakePoint("Longitude","Latitude"), 4326) WHERE "ID" = '${id}';`
          );
          resolve({
            success: "BulkMeters Created successfully",
            token: result.dataValues.ID,
          });
        } catch (error) {
          reject({ success: "Data saved without geometry" });
        }
      },
      (err) => {
        console.log(err);
        
        reject({ error: "BulkMeters creation failed" });
      }
    );
  });
};

exports.findBulkMetersById = (id) => {
  return new Promise((resolve, reject) => {
    BulkMeters.findByPk(id).then(
      (result) => {
        if (result == null) {
          reject({ status: 404, error: "BulkMeters not found" });
        }
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findBulkMetersByAccount = (id) => {
  return new Promise((resolve, reject) => {
    BulkMeters.findAll({
      where: {
        AccountNo: id,
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

exports.updateBulkMetersById = (BulkMetersData, id) => {
  BulkMetersData.id = id;
  return new Promise((resolve, reject) => {
    BulkMeters.update(BulkMetersData, {
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

exports.deleteBulkMetersById = (id) => {
  return new Promise((resolve, reject) => {
    BulkMeters.destroy({
      where: {
        ID: id,
      },
    }).then(
      (result) => {
        if (result != 0) resolve({ success: "Deleted successfully!!!" });
        else reject({ error: "BulkMeters does not exist!!!" });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findAllBulkMeters = () => {
  return new Promise((resolve, reject) => {
    BulkMeters.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findBulkMetersPagnited = (offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, meta] = await sequelize.query(
        `SELECT * FROM "BulkMeters" ORDER BY "createdAt" ASC LIMIT 12 OFFSET ${offset}  `
      );
      const [count, mdata] = await sequelize.query(
        `SELECT COUNT(*) FROM "BulkMeters"`
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

exports.findBulkMetersPagnitedSearch = (column, value, offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT * FROM "BulkMeters" WHERE "${column}" ILIKE '%${value}%' LIMIT 12 OFFSET ${offset}`
      );
      const [count, mdata] = await sequelize.query(
        `SELECT COUNT(*) FROM "BulkMeters" WHERE "${column}" ILIKE '%${value}%'`
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

exports.searchOneBulkMeters = (value) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT "Name","AccountNo", "Latitude", "Longitude" FROM "BulkMeters" WHERE ("AccountNo" ILIKE '%${value}%' OR "Name" ILIKE '%${value}%') LIMIT 1 OFFSET 0`
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

exports.filterBulkMeters = (column, operator, value, offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT * FROM "BulkMeters" WHERE "${column}" ${operator} '${value}' LIMIT 12 OFFSET ${offset}`
      );

      const [count, cmetadata] = await sequelize.query(
        `SELECT Count(*)::int AS total FROM "BulkMeters" WHERE "${column}" ${operator} '${value}'`
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
    BulkMeters.findAll({}).then(
      async (result) => {
        const count = await BulkMeters.count();
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
        `SELECT *,ST_MakePoint("Longitude","Latitude") AS point FROM public."BulkMeters"`,
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
        `SELECT Count(*)::FLOAT as total FROM public."BulkMeters"`
      );
      const [dm, hmeta] = await sequelize.query(
        `SELECT Count(DISTINCT "DMA")::FLOAT as total FROM public."BulkMeters"`
      );
      const [zn, dmeta] = await sequelize.query(
        `SELECT Count(DISTINCT "Zone")::FLOAT as total FROM public."BulkMeters"`
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
        `SELECT SUM("Amount") as total FROM public."BulkMetersBillings"`
      );
      const [inv, invmeta] = await sequelize.query(
        `SELECT SUM("Amount") as total FROM public."BulkMetersBillings"`
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
        `SELECT "AccountType" AS name,Count(*)::int AS value FROM public."BulkMeters" GROUP BY "AccountType"`
      );
      const [accStatus, ameta] = await sequelize.query(
        `SELECT "AccountStatus"  AS name,Count(*)::int  AS value FROM public."BulkMeters" GROUP BY "AccountStatus"`
      );

      const [mtrStatus, mtrmeta] = await sequelize.query(
        `SELECT "MeterStatus"  AS name,Count(*)::int  AS value FROM public."BulkMeters" GROUP BY "MeterStatus"`
      );
      const [dma, dmameta] = await sequelize.query(
        `SELECT "DMA"  AS name,Count(*)::int  AS value FROM public."BulkMeters" GROUP BY "DMA"`
      );
      const [zone, znmeta] = await sequelize.query(
        `SELECT "Zone"  AS name,Count(*)::int  AS value FROM public."BulkMeters" GROUP BY "Zone"`
      );
      const [mtrclass, clmeta] = await sequelize.query(
        `SELECT "Class"  AS name,Count(*)::int  AS value FROM public."BulkMeters" GROUP BY "Class"`
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
