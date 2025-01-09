const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const NRWLeakages = require("../../models/NRWLeakages")(sequelize, Sequelize);
const getNRWLeakages = require("../Utils/ReportedIncident");
const NRWLeakagesMailer = require("../Utils/ReportsMailer");
const multer = require("multer");
const Path = require("path");
const fs = require("fs");
const { FeatureCollection, Point } = require("geojson");

NRWLeakages.sync({ force: false });

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

exports.createNRWLeakage = (NRWLeakagesData) => {
  return new Promise(async (resolve, reject) => {
    if (
      NRWLeakagesData.Latitude === undefined ||
      NRWLeakagesData.Longitude === undefined
    ) {
      reject({ error: "Location is required" });
    }

    try {
      const Images = `${NRWLeakagesData.DMAName}-${Date.now()}.png`;
      createFileFromBase64(NRWLeakagesData.Image, Images);
      NRWLeakagesData.Image = Images;
      const createdNRWLeakage = await NRWLeakages.create(NRWLeakagesData);
      const id = createdNRWLeakage.dataValues.ID;
      const updateGeom = `
        UPDATE public."NRWLeakages"
        SET "geom" = ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)
        WHERE "ID" = :id
      `;
      const updateSerial = `
    UPDATE public."NRWLeakages"
    SET "SerialNo" = 'NRW' || LPAD(COALESCE((
        SELECT CAST(SUBSTRING(MAX("SerialNo") FROM 4) AS INTEGER) + 1
        FROM public."NRWLeakages"
    ), 1)::TEXT, 3, '0')
    WHERE "ID" = :id`;

      const [data, dmeta] = await sequelize.query(updateGeom, {
        replacements: {
          longitude: NRWLeakagesData.Longitude,
          latitude: NRWLeakagesData.Latitude,
          id: id,
        },
      });

      const [ser, srmeta] = await sequelize.query(updateSerial, {
        replacements: {
          id: id,
        },
      });
      const [reportedData, rDmeta] = await sequelize.query(
        `SELECT * FROM "NRWLeakages" WHERE "ID" =  '${id}' `
      );

      let content = await getNRWLeakages.getReported("Admin", reportedData[0]);

      NRWLeakagesMailer.sendMail(
        "NRW Incident Reported",
        createdNRWLeakage?.dataValues?.Email,
        content
      );

      resolve({
        success: "Reported successfully",
        ID: id,
      });
    } catch (error) {
      reject({ error: error.message ?? "Creation failed" });
    }
  });
};

exports.findAllNRWLeakages = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, metdata] =
        await sequelize.query(`SELECT "NRWLeakages"."Longitude","NRWLeakages"."Longitude", "NRWLeakages"."Latitude", "NRWLeakages"."Image", "NRWLeakages"."SerialNo", "NRWLeakages"."Type", "NRWLeakages"."Description", 
         "NRWLeakages"."Location", "NRWLeakages"."Route", "NRWLeakages"."Name", "NRWLeakages"."createdAt" AS "DateNRWLeakageed", "NRWLeakages"."Phone" AS "NRWLeakageedBy",
        "NRWLeakages"."Status", "Mobiles"."Name" AS "AssignedTo", "NRWLeakages"."updatedAt" AS "DateResolved" FROM "NRWLeakages" 
        LEFT OUTER JOIN "Mobiles" ON "NRWLeakages"."NRWUserID" = "Mobiles"."UserID" :: VARCHAR
        LEFT OUTER JOIN "PublicUsers" ON "NRWLeakages"."UserID"::varchar = "PublicUsers"."UserID"::varchar ORDER BY "DateNRWLeakageed"`);
      resolve({ data: data });
    } catch (error) {
      reject({ error: "Retrieve Failed!" });
    }
  });
};

exports.findNRWLeakagesPaginated = (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [results, metadata] = await sequelize.query(
        `SELECT "NRWLeakages"."SerialNo", "NRWLeakages"."Longitude", "NRWLeakages"."Latitude", "NRWLeakages"."Type", "NRWLeakages"."Description", "NRWLeakages"."createdAt" AS "DateNRWLeakageed", "NRWLeakages"."Phone" AS "NRWLeakageedBy",
         "NRWLeakages"."Location", "NRWLeakages"."Route", "NRWLeakages"."Name","NRWLeakages"."Status", "Mobiles"."Name" AS "AssignedTo", "NRWLeakages"."updatedAt" AS "DateResolved", "NRWLeakages"."ID", "NRWLeakages"."Image" FROM "NRWLeakages" 
        LEFT OUTER JOIN "Mobiles" ON "NRWLeakages"."NRWUserID" = "Mobiles"."UserID" :: VARCHAR
        LEFT OUTER JOIN "PublicUsers" ON "NRWLeakages"."UserID"::varchar = "PublicUsers"."UserID"::varchar WHERE "NRWLeakages"."Type" = '${type}'
         ORDER BY "DateNRWLeakageed" DESC`
      );
      resolve(results);
    } catch (error) {
      console.log(error);

      reject({ error: "Retrieve failed!" });
    }
  });
};

exports.findAssignedNRWLeakagesPaginated = (nrwId, offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [pending, metap] = await sequelize.query(
        `SELECT "NRWLeakages".* FROM "NRWLeakages"
        LEFT OUTER JOIN "PublicUsers" ON "NRWLeakages"."NRWUserID"::varchar = "PublicUsers"."UserID"::varchar
        WHERE "NRWLeakages"."NRWUserID" = '${nrwId}'
        AND "NRWLeakages"."Status" = 'Assigned'
        ORDER BY "NRWLeakages"."createdAt" DESC
        LIMIT 12 OFFSET ${offset}`
      );
      const [complete, metac] = await sequelize.query(
        `SELECT "NRWLeakages".* FROM "NRWLeakages"
        LEFT OUTER JOIN "PublicUsers" ON "NRWLeakages"."NRWUserID"::varchar = "PublicUsers"."UserID"::varchar
        WHERE "NRWLeakages"."NRWUserID" = '${nrwId}'
        AND "NRWLeakages"."Status" = 'Resolved'
        ORDER BY "NRWLeakages"."createdAt" DESC
         LIMIT 12 OFFSET ${offset}`
      );
      const [countP, metacountR] = await sequelize.query(
        `SELECT COUNT(*) FROM "NRWLeakages"
        LEFT OUTER JOIN "PublicUsers" ON "NRWLeakages"."NRWUserID"::varchar = "PublicUsers"."UserID"::varchar
        WHERE "NRWLeakages"."NRWUserID" = '${nrwId}'
        AND "NRWLeakages"."Status" = 'Assigned'`
      );
      const [countR, metacountP] = await sequelize.query(
        `SELECT COUNT(*) FROM "NRWLeakages"
        LEFT OUTER JOIN "PublicUsers" ON "NRWLeakages"."NRWUserID"::varchar = "PublicUsers"."UserID"::varchar
        WHERE "NRWLeakages"."NRWUserID" = '${nrwId}'
        AND "NRWLeakages"."Status" = 'Resolved'`
      );
      resolve({
        pending: pending,
        complete: complete,
        countP: countP[0].count,
        countR: countR[0].count,
      });
    } catch (error) {
      console.log(error);

      reject({ error: "Retrieve failed!" });
    }
  });
};

exports.findNRWLeakagesJoined = (offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [results, metadata] = await sequelize.query(
        `SELECT "NRWLeakages".*, "Mobiles"."Name","Mobiles"."UserID" FROM "NRWLeakages" LEFT OUTER JOIN "Mobiles" ON 
        "NRWLeakages"."NRWUserID" = "Mobiles"."UserID" :: VARCHAR ORDER BY "NRWLeakages"."updatedAt" DESC LIMIT 5 OFFSET ${offset}`
      );
      const count = await NRWLeakages.count();
      const leaks = await NRWLeakages.count({ where: { Type: "Leakage" } });
      const bursts = await NRWLeakages.count({
        where: { Type: "Sewer Burst" },
      });
      const illegal = await NRWLeakages.count({
        where: { Type: "Illegal Connection" },
      });
      const supply = await NRWLeakages.count({
        where: { Type: "Supply Fail" },
      });
      resolve({
        result: {
          results: results,

          total: count,
          leaks: leaks,
          bursts: bursts,
          illegal: illegal,
          supply: supply,
        },
      });
    } catch (error) {
      reject({ error: "Retrieve failed!" });
    }
  });
};

exports.findNRWLeakagesnTasksPaginated = (offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      NRWLeakages.findAll({ offset: offset, limit: 5 }).then(
        async (result) => {
          const [results, metadata] = await sequelize.query(
            `SELECT "NRWLeakages".*, "Mobiles"."Name","Mobiles"."UserID" FROM "NRWLeakages" LEFT OUTER JOIN "Mobiles" ON 
        "NRWLeakages"."NRWUserID" = "Mobiles"."UserID" :: VARCHAR ORDER BY "NRWLeakages"."updatedAt" DESC LIMIT 5 OFFSET ${offset}`
          );

          const count = await NRWLeakages.count();
          const leaks = await NRWLeakages.count();
          const bursts = await NRWLeakages.count();
          const illegal = await NRWLeakages.count({
            where: { Type: "Illegal Connection" },
          });
          const supply = await NRWLeakages.count({
            where: { Type: "Supply Fail" },
          });
          resolve({
            result: result,
            results: results,
            total: count,
            leaks: leaks,
            bursts: bursts,
            illegal: illegal,
            supply: supply,
          });
        },
        (err) => {
          reject({ error: "Retrieve failed" });
        }
      );
    } catch (error) {
      reject({ error: "Retrieve failed!" });
    }
  });
};

exports.findType = () => {
  return new Promise(async (resolve, reject) => {
    NRWLeakages.findAll({
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

exports.countEachType = (type) => {
  return new Promise(async (resolve, reject) => {
    NRWLeakages.count({
      where: { Type: type },
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

exports.findStatus = () => {
  return new Promise((resolve, reject) => {
    NRWLeakages.findAll({}).then(
      async (result) => {
        const status = await sequelize.query(
          `SELECT "NRWLeakages"."Status", count(*)
        FROM "NRWLeakages" GROUP BY "NRWLeakages"."Status"`
        );
        resolve({
          status: status,
        });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findStatusByType = (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [status, meta] = await sequelize.query(
        `SELECT "NRWLeakages"."Status", count(*) FROM "NRWLeakages" WHERE "Type" = '${type}' GROUP BY "NRWLeakages"."Status"`
      );
      resolve(status);
    } catch (error) {
      reject({ error: "Retrieve failed!" });
    }
  });
};

exports.findMonthly = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT date_trunc('month', "createdAt") as datetime, 
          count("ID") as reports_count
          FROM "NRWLeakages"
          WHERE "createdAt" >= '2022-08-01 00:00:00' 
                and "createdAt" <= '2023-10-30 00:00:00'
          GROUP BY date_trunc('month', "createdAt") 
          ORDER BY datetime`
      );
      resolve({ result });
    } catch (error) {
      reject({ error: "Retrieve failed!" });
    }
  });
};

exports.findNRWLeakageByType = (type, offset) => {
  return new Promise(async (resolve, reject) => {
    NRWLeakages.findAll({
      where: {
        Type: type,
      },
      limit: 5,
      offset: offset,
    }).then(
      async (result) => {
        if (result == null) {
          reject({ status: 404, message: "Data not found" });
        }
        const [join, metadata] = await sequelize.query(
          `SELECT "NRWLeakages".*, "Mobiles"."Name" FROM "NRWLeakages" LEFT OUTER JOIN "Mobiles" ON "Mobiles"."UserID"::varchar = "NRWLeakages"."NRWUserID" WHERE "NRWLeakages"."Type" = '${type}' LIMIT 5 OFFSET ${offset}`
        );
        const count = await sequelize.query(
          `SELECT COUNT(*) FROM "NRWLeakages" WHERE "Type" = '${type}'`
        );
        resolve({
          result: result,
          total: count,
          join: join,
        });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findAllNRWLeakageByType = (type) => {
  return new Promise(async (resolve, reject) => {
    NRWLeakages.findAll({
      where: {
        Type: type,
      },
    }).then(
      async (result) => {
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

exports.findNRWLeakageByID = (id) => {
  return new Promise((resolve, reject) => {
    NRWLeakages.findByPk(id).then(
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

exports.updateNRWLeakageByID = (NRWLeakagesData, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Images = `${NRWLeakagesData.Type}-${Date.now()}.png`;
      createFileFromBase64(NRWLeakagesData.TaskImage, Images);
      NRWLeakagesData.TaskImage = Images;
      NRWLeakages.update(NRWLeakagesData, {
        where: { ID: id },
      });

      console.log(NRWLeakagesData);

      resolve({
        success: "Updated Successfully",
        ID: id,
      });
    } catch (error) {
      reject({ error: error.message ?? "NRWLeakage Update Failed" });
    }
  });
};

exports.deleteNRWLeakageByID = (id) => {
  return new Promise((resolve, reject) => {
    NRWLeakages.destroy({
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
    NRWLeakages.findAll({
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
    NRWLeakages.findAll({
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
    NRWLeakages.findAll({}).then(
      async (result) => {
        const Total = await NRWLeakages.count({});
        const Received = await NRWLeakages.count({
          where: { Status: "Received" },
        });
        const Assigned = await NRWLeakages.count({
          where: { Status: "Assigned" },
        });
        const Resolved = await NRWLeakages.count({
          where: { Status: "Resolved" },
        });
        const NotResolved = await NRWLeakages.count({
          where: { Status: "Not Resolved" },
        });

        resolve({
          Total,
          Received,
          Assigned,
          Resolved,
          NotResolved,
        });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

// Get Status Count for a Specific Type
exports.findStatusCountByType = (type) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT "Status" AS label, COUNT(*) AS value FROM "NRWLeakages" WHERE "Type" = :type GROUP BY "Status"`,
        {
          replacements: { type },
          type: sequelize.QueryTypes.SELECT,
        }
      )
      .then(
        (result) => resolve(result),
        (err) => {
          reject(null);
        }
      );
  });
};

// Get Monthly Count for a Specific Type
exports.findMonthlyCountByType = (type) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT to_char("createdAt", 'Mon YYYY') AS name, COUNT(*) AS value FROM "NRWLeakages" WHERE "Type" = :type GROUP BY name ORDER BY name`,
        {
          replacements: { type },
          type: sequelize.QueryTypes.SELECT,
        }
      )
      .then(
        (result) => resolve(result),
        (err) => {
          reject(null);
        }
      );
  });
};

exports.findNRWLeakageTypeCount = (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT "NRWLeakages"."Status",  COUNT(*) FROM "NRWLeakages"  WHERE "NRWLeakages"."Type" = '${type}' GROUP BY "NRWLeakages"."Status"`
      );
      resolve({ result });
    } catch (error) {
      reject({ error: "Retrieve failed!" });
    }
  });
};

exports.findEachNRWLeakageType = (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT "NRWLeakages"."Status",  COUNT(*) FROM "NRWLeakages"  WHERE "NRWLeakages"."Type" = '${type}' GROUP BY "NRWLeakages"."Status"`
      );
      resolve({ result });
    } catch (error) {
      reject({ error: "Retrieve failed!" });
    }
  });
};

exports.findNRWLeakageByStatus = (status, offset) => {
  return new Promise(async (resolve, reject) => {
    NRWLeakages.findAll({
      where: {
        Status: status,
      },
      offset: offset,
      limit: 5,
    }).then(
      async (result) => {
        const [results, metadata] = await sequelize.query(
          `SELECT "NRWLeakages".*, "Mobiles"."Name" FROM "NRWLeakages" LEFT OUTER JOIN "Mobiles" ON "Mobiles"."UserID"::varchar = "NRWLeakages"."NRWUserID" WHERE "NRWLeakages"."Status" = '${status}' LIMIT 5 OFFSET ${offset}`
        );
        const count = await NRWLeakages.count({
          where: {
            Status: status,
          },
        });
        const leaks = await NRWLeakages.count({
          where: { Status: status, Type: "Leakage" },
        });
        const bursts = await NRWLeakages.count({
          where: { Status: status, Type: "Sewer Burst" },
        });
        const illegal = await NRWLeakages.count({
          where: { Status: status, Type: "Illegal Connection" },
        });
        const supply = await NRWLeakages.count({
          where: { Status: status, Type: "Supply Fail" },
        });
        if (result == null) {
          reject({ status: 404, error: "Data not found" });
        }
        resolve({
          result: {
            results: results,

            total: count,
            leaks: leaks,
            bursts: bursts,
            illegal: illegal,
            supply: supply,
          },
        });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.getStatusByID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [join, metadata] = await sequelize.query(
        `SELECT "NRWLeakages".*, "Mobiles"."Name" FROM "NRWLeakages" LEFT OUTER JOIN "Mobiles" ON "Mobiles"."UserID"::varchar = "NRWLeakages"."NRWUserID" WHERE "NRWLeakages"."ID" = '${id}'`
      );
      if (join.length > 0) {
        resolve(join[0]);
      } else reject({ error: "Not found" });
    } catch (error) {
      reject({ error: "Retrieve failed" });
    }
  });
};

exports.getStats = (start, end) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [rpt, rptmeta] = await sequelize.query(
        `SELECT Count(*)::int as total FROM public."NRWLeakages" WHERE "createdAt"::Date >= '${start}'
        AND "createdAt"::Date <= '${end}'`
      );
      const [lkg, lkgmeta] = await sequelize.query(
        `SELECT Count(*)::int as total FROM public."NRWLeakages" WHERE "Type" = 'Leakage'
        AND "createdAt"::Date >= '${start}' AND "createdAt"::Date <= '${end}'`
      );
      const [swr, swrmeta] = await sequelize.query(
        `SELECT Count(*)::int as total FROM public."NRWLeakages" WHERE "Type" = 'Sewer Burst'
        AND "createdAt"::Date >= '${start}' AND "createdAt"::Date <= '${end}'`
      );
      const [ill, illmeta] = await sequelize.query(
        `SELECT Count(*)::int as total FROM public."NRWLeakages" WHERE "Type" = 'Illegal Connection'
        AND "createdAt"::Date >= '${start}' AND "createdAt"::Date <= '${end}'`
      );
      const [sf, sfmeta] = await sequelize.query(
        `SELECT Count(*)::int as total FROM public."NRWLeakages" WHERE "Type" = 'Supply Fail'
        AND "createdAt"::Date >= '${start}' AND "createdAt"::Date <= '${end}'`
      );
      const [vand, vandmeta] = await sequelize.query(
        `SELECT Count(*)::int as total FROM public."NRWLeakages" WHERE "Type" = 'Vandalism'
        AND "createdAt"::Date >= '${start}' AND "createdAt"::Date <= '${end}'`
      );
      const [other, othermeta] = await sequelize.query(
        `SELECT Count(*)::int as total FROM public."NRWLeakages" WHERE "Type" = 'Other'
        AND "createdAt"::Date >= '${start}' AND "createdAt"::Date <= '${end}'`
      );

      resolve({
        Total: rpt,
        Leakage: lkg,
        SewerBurst: swr,
        IllegalConnection: ill,
        SupplyFail: sf,
        Vandalism: vand,
        Other: other,
      });
    } catch (error) {
      reject(null);
    }
  });
};

exports.findCharts = (start, end) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [lkg, lkgmeta] = await sequelize.query(
        `SELECT "Status" AS name,Count(*)::int AS value FROM public."NRWLeakages" WHERE "Type" = 'Leakage' 
        AND "createdAt"::Date >= '${start}' AND "createdAt"::Date <= '${end}' GROUP BY "Status"`
      );
      const [swr, swrmeta] = await sequelize.query(
        `SELECT "Status" AS name,Count(*)::int AS value FROM public."NRWLeakages" WHERE "Type" = 'Sewer Burst'
        AND "createdAt"::Date >= '${start}' AND "createdAt"::Date <= '${end}' GROUP BY "Status"`
      );

      const [ill, illmeta] = await sequelize.query(
        `SELECT "Status" AS name,Count(*)::int AS value FROM public."NRWLeakages" WHERE "Type" = 'Illegal Connection' 
        AND "createdAt"::Date >= '${start}' AND "createdAt"::Date <= '${end}' GROUP BY "Status"`
      );
      const [sf, sfmeta] = await sequelize.query(
        `SELECT "Status" AS name,Count(*)::int AS value FROM public."NRWLeakages" WHERE "Type" = 'Supply Fail' 
        AND "createdAt"::Date >= '${start}' AND "createdAt"::Date <= '${end}' GROUP BY "Status"`
      );
      const [vand, vandmeta] = await sequelize.query(
        `SELECT "Status" AS name,Count(*)::int AS value FROM public."NRWLeakages" WHERE "Type" = 'Vandalism'
        AND "createdAt"::Date >= '${start}' AND "createdAt"::Date <= '${end}' GROUP BY "Status"`
      );
      const [other, othermeta] = await sequelize.query(
        `SELECT "Status" AS name,Count(*)::int AS value FROM public."NRWLeakages" WHERE "Type" = 'Other' 
        AND "createdAt"::Date >= '${start}' AND "createdAt"::Date <= '${end}' GROUP BY "Status"`
      );

      resolve({
        Leakage: lkg,
        SewerBurst: swr,
        IllegalConnection: ill,
        SupplyFail: sf,
        Vandalism: vand,
        Other: other,
      });
    } catch (error) {
      reject({ error: "failed" });
    }
  });
};

exports.findAllNRWLeakagesPaginated = (type, offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      let typeQuery = "";
      if (type != "All") {
        typeQuery = `WHERE "NRWLeakages"."Status" = '${type}'`;
      }

      const [result, metadata] = await sequelize.query(
        `SELECT * FROM "NRWLeakages" ${typeQuery}  ORDER BY "createdAt" DESC LIMIT 12 OFFSET ${offset}`
      );

      const [count, cmeta] = await sequelize.query(
        `SELECT Count(*)::int AS total FROM "NRWLeakages" ${typeQuery}`
      );

      resolve({ data: result, total: count[0].total });
    } catch (error) {
      reject({ error: "Retrieve failed!" });
    }
  });
};

exports.findGeojson = (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      let typeQuery = "";
      if (type !== "All") {
        typeQuery = `WHERE "NRWLeakages"."Status" = '${type}'`;
      }

      const [result, metadata] = await sequelize.query(
        `SELECT * FROM "NRWLeakages" ${typeQuery}`
      );

      // Convert the result to GeoJSON format
      const geojson = {
        type: "FeatureCollection",
        features: result.map((report) => ({
          type: "Feature",
          geometry: report.geom,
          properties: {
            ID: report.ID,
            SerialNo: report.SerialNo,
            Type: report.Type,
            Image: report.Image,
            DMAName: report.DMAName,
            Status: report.Status,
            ReportedBy: report.ReportedBy,
            AssignedTo: report.AssignedTo,
            DateResolved: report.DateResolved,
            createdAt: report.createdAt,
          },
        })),
      };

      resolve(geojson);
    } catch (error) {
      reject(null);
    }
  });
};

exports.searchNRWLeakages = (col, val) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT "NRWLeakages"."ID","NRWLeakages"."Latitude", "NRWLeakages"."Longitude", "NRWLeakages"."SerialNo",
        "NRWLeakages"."Type", "NRWLeakages"."Description", "NRWLeakages"."createdAt" AS "DateNRWLeakageed", "NRWLeakages"."Phone" AS "NRWLeakageedBy",
        "NRWLeakages"."Status", "Mobiles"."Name" AS "AssignedTo", "NRWLeakages"."updatedAt" AS "DateResolved"
        FROM "NRWLeakages" LEFT OUTER JOIN "Mobiles" ON "NRWLeakages"."NRWUserID" = "Mobiles"."UserID" :: VARCHAR
        LEFT OUTER JOIN "PublicUsers" ON "NRWLeakages"."UserID"::varchar = "PublicUsers"."UserID"::varchar
        WHERE "NRWLeakages"."${col}"::varchar ILIKE '%${val}%'
        ORDER BY "DateNRWLeakageed" DESC `
      );
      const [count, mdata] = await sequelize.query(
        `SELECT COUNT(*) FROM "NRWLeakages" WHERE "${col}"::varchar ILIKE '%${val}%'`
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

exports.paginatedSearchNRWLeakages = (column, value, offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT "NRWLeakages"."ID","NRWLeakages"."Latitude", "NRWLeakages"."Longitude", "NRWLeakages"."SerialNo", "NRWLeakages"."Name",
        "NRWLeakages"."Type", "NRWLeakages"."Description",  "NRWLeakages"."createdAt" AS "DateNRWLeakageed", "NRWLeakages"."Phone" AS "NRWLeakageedBy",
        "NRWLeakages"."Status", "Mobiles"."Name" AS "AssignedTo", "NRWLeakages"."updatedAt" AS "DateResolved"
        FROM "NRWLeakages" LEFT OUTER JOIN "Mobiles" ON "NRWLeakages"."NRWUserID" = "Mobiles"."UserID" :: VARCHAR
        LEFT OUTER JOIN "PublicUsers" ON "NRWLeakages"."UserID"::varchar = "PublicUsers"."UserID"::varchar
        WHERE "NRWLeakages"."${column}"::varchar ILIKE '%${value}%'
        ORDER BY "DateNRWLeakageed" DESC LIMIT 12 OFFSET ${offset} `
      );
      const [count, mdata] = await sequelize.query(
        `SELECT COUNT(*) FROM "NRWLeakages" WHERE "${column}"::varchar ILIKE '%${value}%'`
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

exports.searchFacility = (value) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT * FROM "Facilities"
        WHERE "Name" ILIKE '%${value}%'
        ORDER BY "Name" DESC LIMIT 5  `
      );

      resolve(result);
    } catch (error) {
      reject({ error: "Retrieve failed!" });
    }
  });
};

exports.filterNRWLeakages = (column, operator, value) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT "NRWLeakages"."ID","NRWLeakages"."Latitude", "NRWLeakages"."Longitude", "NRWLeakages"."SerialNo",
        "NRWLeakages"."Type", "NRWLeakages"."Description",  "NRWLeakages"."createdAt" AS "DateNRWLeakageed", "NRWLeakages"."Phone" AS "NRWLeakageedBy",
        "NRWLeakages"."Status", "Mobiles"."Name" AS "AssignedTo", "NRWLeakages"."updatedAt" AS "DateResolved"
        FROM "NRWLeakages" LEFT OUTER JOIN "Mobiles" ON "NRWLeakages"."NRWUserID" = "Mobiles"."UserID" :: VARCHAR
        LEFT OUTER JOIN "PublicUsers" ON "NRWLeakages"."UserID"::varchar = "PublicUsers"."UserID"::varchar
         WHERE "NRWLeakages"."${column}" ${operator} '${value}' ORDER BY "DateNRWLeakageed" DESC`
      );

      const [count, cmetadata] = await sequelize.query(
        `SELECT Count(*)::int AS total FROM "NRWLeakages" WHERE "${column}" ${operator} '${value}'`
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

exports.paginatedFilterNRWLeakages = (column, operator, value, offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT "NRWLeakages"."ID","NRWLeakages"."Latitude", "NRWLeakages"."Longitude", "NRWLeakages"."SerialNo", "NRWLeakages"."Name",
        "NRWLeakages"."Type", "NRWLeakages"."Description",  "NRWLeakages"."createdAt" AS "DateNRWLeakageed", "NRWLeakages"."Phone" AS "NRWLeakageedBy",
        "NRWLeakages"."Status", "Mobiles"."Name" AS "AssignedTo", "NRWLeakages"."updatedAt" AS "DateResolved"
        FROM "NRWLeakages" LEFT OUTER JOIN "Mobiles" ON "NRWLeakages"."NRWUserID" = "Mobiles"."UserID" :: VARCHAR
        LEFT OUTER JOIN "PublicUsers" ON "NRWLeakages"."UserID"::varchar = "PublicUsers"."UserID"::varchar
         WHERE "NRWLeakages"."${column}" ${operator} '${value}' LIMIT 12 OFFSET ${offset}`
      );

      const [count, cmetadata] = await sequelize.query(
        `SELECT Count(*)::int AS total FROM "NRWLeakages" WHERE "${column}" ${operator} '${value}'`
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

exports.getNRWLeakagesNRWLeakageedByUserId = (id, offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT "NRWLeakages".*,"PublicUsers".* FROM "NRWLeakages" INNER JOIN "PublicUsers" ON 
        "NRWLeakages"."UserID" = "PublicUsers"."UserID"::VARCHAR WHERE "NRWLeakages"."UserID" = '${id}'
        ORDER BY "NRWLeakages"."createdAt" DESC LIMIT 12 OFFSET ${offset}`
      );
      resolve(result);
    } catch (error) {
      reject({ error: "Retrieve failed!" });
    }
  });
};

exports.searchIncident = (value) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT * FROM "NRWLeakages" WHERE "SerialNo" = '${value}' LIMIT 1 OFFSET 0`
      );
      resolve(result);
    } catch (error) {
      reject([]);
    }
  });
};

exports.findDistributionByDMA = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [Dist, dmameta] = await sequelize.query(
        `SELECT "DMAName" AS name, COUNT("DMAName")::int AS value FROM "NRWLeakages" GROUP BY "DMAName"`
      );
      resolve({
        Dist,
      });
    } catch (error) {
      reject(null);
    }
  });
};
