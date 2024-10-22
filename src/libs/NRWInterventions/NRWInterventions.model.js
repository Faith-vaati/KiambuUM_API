const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = require("../../configs/connection");
const NRWIntervention = require("../../models/NRWInterventions")(
  sequelize,
  Sequelize
);

NRWIntervention.sync({ force: false });

function cleanData(obj) {
  for (const key in obj) {
    if (obj[key] === "" || obj[key] === null) {
      delete obj[key];
    }
  }
  return obj;
}

const fs = require("fs");
const Path = require("path");

async function createFileFromBase64(base64Data, filePath) {
  if (filePath != null && base64Data != null) {
    const base64DataWithoutHeader = base64Data.replace(
      /^data:\w+\/\w+;base64,/,
      ""
    );
    const buffer = Buffer.from(base64DataWithoutHeader, "base64");
    const fullPath = Path.join(__dirname, "../../../uploads", filePath);
    fs.writeFile(fullPath, buffer, (err) => {
      if (err) {
      } else {
      }
    });
  }
}

exports.create = (NRWInterventionData) => {
  console.log(NRWInterventionData);

  return new Promise(async (resolve, reject) => {
    if (
      NRWInterventionData.Scope === undefined ||
      NRWInterventionData.MeterActivity === undefined
    ) {
      reject({ error: "Body is required" });
    }

    try {
      const currentDate =
        NRWInterventionData.Date || new Date().toISOString().split("T")[0];

      const Images = `${
        NRWInterventionData.MeterActivity
      }-${currentDate}-${Date.now()}.png`;
      createFileFromBase64(NRWInterventionData.ActivityPhoto, Images);
      NRWInterventionData.ActivityPhoto = Images;

      if (NRWInterventionData.AfterPhoto !== "") {
        const Image2 = `${NRWInterventionData.MeterActivity}-${
          NRWInterventionData.Reason
        }-${currentDate}-${Date.now()}.png`;
        createFileFromBase64(NRWInterventionData.AfterPhoto, Image2);
        NRWInterventionData.AfterPhoto = Image2;
      }

      const createdIntervention = await NRWIntervention.create(
        NRWInterventionData
      );
      const id = createdIntervention.dataValues.ID;

      const updateGeom = `
        UPDATE public."NRWInterventions"
        SET "geom" = ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)
        WHERE "ID" = :id
      `;

      const [data, dmeta] = await sequelize.query(updateGeom, {
        replacements: {
          longitude: NRWInterventionData.Longitude,
          latitude: NRWInterventionData.Latitude,
          id: id,
        },
      });

      resolve({
        success: "Submitted successfully",
        ID: id,
      });
    } catch (error) {
      reject({ error: error.message ?? "Submission failed" });
    }
  });
};

exports.findNRWInterventionById = (id) => {
  return new Promise((resolve, reject) => {
    NRWIntervention.findByPk(id).then(
      (result) => {
        if (result == null) {
          reject({ status: 404, error: "NRW Intervention not found" });
        }
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findNRWInterventionByName = (value) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, meta] = await sequelize.query(
        `SELECT * FROM "NRWInterventions" WHERE "Name" ILIKE '%${value}%'`
      );
      resolve(data);
    } catch (error) {
      reject({ error: "Retrieve Failed" });
    }
  });
};

exports.updateNRWInterventionById = (NRWInterventionData, id) => {
  NRWInterventionData = cleanData(NRWInterventionData);
  return new Promise((resolve, reject) => {
    NRWIntervention.update(NRWInterventionData, {
      where: {
        ID: id,
      },
    }).then(
      async (result) => {
        try {
          if (NRWInterventionData.Latitude && NRWInterventionData.Longitude) {
            const [data, dmeta] = await sequelize.query(
              `UPDATE public."NRWInterventions" SET "geom" = ST_SetSRID(ST_MakePoint("Longitude","Latitude"), 4326) WHERE "ID" = '${id}';`
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

exports.deleteNRWInterventionById = (id) => {
  return new Promise((resolve, reject) => {
    NRWIntervention.destroy({
      where: {
        ID: id,
      },
    }).then(
      (result) => {
        if (result != 0) resolve({ success: "Deleted successfully!!!" });
        else reject({ error: "NRWIntervention does not exist!!!" });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findAllNRWIntervention = () => {
  return new Promise((resolve, reject) => {
    NRWIntervention.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findNRWInterventionPaginated = (dma, type, start, end, offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      let typeQuery =
        type !== "All" && dma !== "All"
          ? `WHERE "NRWInterventions"."MeterActivity" = '${type}' AND "DMAName" = '${dma}' 
          AND "Date"::Date >= '${start}' AND "Date"::Date <= '${end}'`
          : type !== "All" && dma === "All"
          ? `WHERE "NRWInterventions"."MeterActivity" = '${type}' AND "Date"::Date >= '${start}' AND "Date"::Date <= '${end}'`
          : type === "All" && dma !== "All"
          ? `WHERE "NRWInterventions"."DMAName" = '${dma}' AND "Date"::Date >= '${start}' AND "Date"::Date <= '${end}'`
          : "";

      const [result, meta] = await sequelize.query(
        `SELECT * FROM "NRWInterventions" ${typeQuery} ORDER BY "createdAt" DESC LIMIT 12 OFFSET ${offset}`
      );
      const [count, mdata] = await sequelize.query(
        `SELECT COUNT(*)::int AS total FROM "NRWInterventions" ${typeQuery}`
      );

      resolve({
        data: result,
        total: count[0].total,
      });
    } catch (error) {
      reject({ error: "Retrieve Failed!" });
    }
  });
};

exports.findNRWInterventionPagnitedSearch = (column, value, offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT * FROM "NRWInterventions" WHERE "${column}" ILIKE '%${value}%' LIMIT 12 OFFSET ${offset}`
      );
      const [count, mdata] = await sequelize.query(
        `SELECT COUNT(*) FROM "NRWInterventions" WHERE "${column}" ILIKE '%${value}%'`
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

exports.searchOneNRWIntervention = (value) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT "Name","AccountNo", "Latitude", "Longitude" FROM "NRWInterventions" WHERE ("AccountNo" ILIKE '%${value}%' OR "Name" ILIKE '%${value}%') LIMIT 1 OFFSET 0`
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

exports.filterNRWIntervention = (column, operator, value, offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT * FROM "NRWInterventions" WHERE "${column}" ${operator} '${value}' LIMIT 12 OFFSET ${offset}`
      );

      const [count, cmetadata] = await sequelize.query(
        `SELECT Count(*)::int AS total FROM "NRWInterventions" WHERE "${column}" ${operator} '${value}'`
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
    NRWIntervention.findAll({}).then(
      async (result) => {
        const count = await NRWIntervention.count();
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
        `SELECT *,ST_MakePoint("Longitude","Latitude") AS point FROM public."NRWInterventions"`,
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
        `SELECT Count(*)::FLOAT as total FROM public."NRWInterventions"`
      );
      const [dm, hmeta] = await sequelize.query(
        `SELECT Count(DISTINCT "DMA")::FLOAT as total FROM public."NRWInterventions"`
      );
      const [zn, dmeta] = await sequelize.query(
        `SELECT Count(DISTINCT "Zone")::FLOAT as total FROM public."NRWInterventions"`
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
        `SELECT SUM("Amount") as total FROM public."NRWInterventionBillings"`
      );
      const [inv, invmeta] = await sequelize.query(
        `SELECT SUM("Amount") as total FROM public."NRWInterventionBillings"`
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
        `SELECT "AccountType" AS name,Count(*)::int AS value FROM public."NRWInterventions" GROUP BY "AccountType"`
      );
      const [accStatus, ameta] = await sequelize.query(
        `SELECT "AccountStatus"  AS name,Count(*)::int  AS value FROM public."NRWInterventions" GROUP BY "AccountStatus"`
      );

      const [mtrStatus, mtrmeta] = await sequelize.query(
        `SELECT "MeterStatus"  AS name,Count(*)::int  AS value FROM public."NRWInterventions" GROUP BY "MeterStatus"`
      );
      const [dma, dmameta] = await sequelize.query(
        `SELECT "DMA"  AS name,Count(*)::int  AS value FROM public."NRWInterventions" GROUP BY "DMA"`
      );
      const [zone, znmeta] = await sequelize.query(
        `SELECT "Zone"  AS name,Count(*)::int  AS value FROM public."NRWInterventions" GROUP BY "Zone"`
      );
      const [mtrclass, clmeta] = await sequelize.query(
        `SELECT "Class"  AS name,Count(*)::int  AS value FROM public."NRWInterventions" GROUP BY "Class"`
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
