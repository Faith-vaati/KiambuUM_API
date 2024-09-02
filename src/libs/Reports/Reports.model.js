const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const Reports = require("../../models/Reports")(sequelize, Sequelize);
const getReported = require("../Utils/ReportedIncident");
const ReportsMailer = require("../Utils/ReportsMailer");
const multer = require("multer");
const Path = require("path");
const fs = require("fs");
const { FeatureCollection, Point } = require("geojson");

Reports.sync({ force: false });

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

exports.createReport = (ReportsData) => {
  return new Promise(async (resolve, reject) => {
    if (
      ReportsData.Latitude === undefined ||
      ReportsData.Longitude === undefined
    ) {
      reject({ error: "Location is required" });
    }

    try {
      const Images = `${ReportsData.Type}-${Date.now()}.png`;
      createFileFromBase64(ReportsData.Image, Images);
      ReportsData.Image = Images;
      const createdReport = await Reports.create(ReportsData);
      const id = createdReport.dataValues.ID;
      const updateGeom = `
        UPDATE public."Reports"
        SET "geom" = ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)
        WHERE "ID" = :id
      `;
      const updateSerial = `
        UPDATE public."Reports"
        SET "SerialNo" = COALESCE((SELECT MAX("SerialNo") FROM public."Reports") + 1, 1)
        WHERE "ID" = :id
      `;
      const [data, dmeta] = await sequelize.query(updateGeom, {
        replacements: {
          longitude: ReportsData.Longitude,
          latitude: ReportsData.Latitude,
          id: id,
        },
      });

      const [ser, srmeta] = await sequelize.query(updateSerial, {
        replacements: {
          id: id,
        },
      });
      const [reportedData, rDmeta] = await sequelize.query(
        `SELECT * FROM "Reports" WHERE "ID" =  '${id}' `
      );

      let content = await getReported.getReported("Admin", reportedData[0]);

      ReportsMailer.sendMail(
        "New Incident Reported",
        createdReport?.dataValues?.Email,
        content
      );

      resolve({
        success: "Reported successfully",
        ID: id,
      });
    } catch (error) {
      reject({ error: error.message ?? "Report creation failed" });
    }
  });
};

exports.findAllReports = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, metdata] =
        await sequelize.query(`SELECT "Reports"."Longitude","Reports"."Longitude", "Reports"."Latitude", "Reports"."Image", "Reports"."SerialNo", "Reports"."Type", "Reports"."Description", 
         "Reports"."Location", "Reports"."Route", "Reports"."Name", "Reports"."createdAt" AS "DateReported", "Reports"."Phone" AS "ReportedBy",
        "Reports"."Status", "Mobiles"."Name" AS "AssignedTo", "Reports"."updatedAt" AS "DateResolved" FROM "Reports" 
        LEFT OUTER JOIN "Mobiles" ON "Reports"."NRWUserID" = "Mobiles"."UserID" :: VARCHAR
        LEFT OUTER JOIN "PublicUsers" ON "Reports"."UserID"::varchar = "PublicUsers"."UserID"::varchar ORDER BY "DateReported"`);
      resolve({ data: data });
    } catch (error) {
      console.log(error);
      reject({ error: "Retrieve Failed!" });
    }
  });
};

exports.findReportsPaginated = (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [results, metadata] = await sequelize.query(
        `SELECT "Reports"."SerialNo", "Reports"."Longitude", "Reports"."Latitude", "Reports"."Type", "Reports"."Description", "Reports"."createdAt" AS "DateReported", "Reports"."Phone" AS "ReportedBy",
         "Reports"."Location", "Reports"."Route", "Reports"."Name","Reports"."Status", "Mobiles"."Name" AS "AssignedTo", "Reports"."updatedAt" AS "DateResolved", "Reports"."ID", "Reports"."Image" FROM "Reports" 
        LEFT OUTER JOIN "Mobiles" ON "Reports"."NRWUserID" = "Mobiles"."UserID" :: VARCHAR
        LEFT OUTER JOIN "PublicUsers" ON "Reports"."UserID"::varchar = "PublicUsers"."UserID"::varchar WHERE "Reports"."Type" = '${type}'
         ORDER BY "DateReported" DESC`
      );
      resolve(results);
    } catch (error) {
      reject({ error: "Retrieve failed!" });
    }
  });
};

exports.findAssignedReportsPaginated = (nrwId, offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [pending, metap] = await sequelize.query(
        `SELECT "Reports".* FROM "Reports"
        LEFT OUTER JOIN "PublicUsers" ON "Reports"."UserID"::varchar = "PublicUsers"."UserID"::varchar
        WHERE "Reports"."NRWUserID" = '${nrwId}'
        AND "Reports"."Status" = 'In Progress'
        ORDER BY "Reports"."createdAt" DESC
        LIMIT 12 OFFSET ${offset}`
      );
      const [complete, metac] = await sequelize.query(
        `SELECT "Reports".* FROM "Reports"
        LEFT OUTER JOIN "PublicUsers" ON "Reports"."UserID"::varchar = "PublicUsers"."UserID"::varchar
        WHERE "Reports"."NRWUserID" = '${nrwId}'
        AND "Reports"."Status" = 'Resolved'
        ORDER BY "Reports"."createdAt" DESC
         LIMIT 12 OFFSET ${offset}`
      );
      const [countP, metacountR] = await sequelize.query(
        `SELECT COUNT(*) FROM "Reports"
        LEFT OUTER JOIN "PublicUsers" ON "Reports"."UserID"::varchar = "PublicUsers"."UserID"::varchar
        WHERE "Reports"."NRWUserID" = '${nrwId}'
        AND "Reports"."Status" = 'In Progress'`
      );
      const [countR, metacountP] = await sequelize.query(
        `SELECT COUNT(*) FROM "Reports"
        LEFT OUTER JOIN "PublicUsers" ON "Reports"."UserID"::varchar = "PublicUsers"."UserID"::varchar
        WHERE "Reports"."NRWUserID" = '${nrwId}'
        AND "Reports"."Status" = 'Resolved'`
      );
      resolve({
        pending: pending,
        complete: complete,
        countP: countP[0].count,
        countR: countR[0].count,
      });
    } catch (error) {
      reject({ error: "Retrieve failed!" });
    }
  });
};

exports.findReportsJoined = (offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [results, metadata] = await sequelize.query(
        `SELECT "Reports".*, "Mobiles"."Name","Mobiles"."UserID" FROM "Reports" LEFT OUTER JOIN "Mobiles" ON 
        "Reports"."NRWUserID" = "Mobiles"."UserID" :: VARCHAR ORDER BY "Reports"."updatedAt" DESC LIMIT 5 OFFSET ${offset}`
      );
      const count = await Reports.count();
      const leaks = await Reports.count({ where: { Type: "Leakage" } });
      const bursts = await Reports.count({ where: { Type: "Sewer Burst" } });
      const illegal = await Reports.count({
        where: { Type: "Illegal Connection" },
      });
      const supply = await Reports.count({ where: { Type: "Supply Fail" } });
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

exports.findReportsnTasksPaginated = (offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      Reports.findAll({ offset: offset, limit: 5 }).then(
        async (result) => {
          const [results, metadata] = await sequelize.query(
            `SELECT "Reports".*, "Mobiles"."Name","Mobiles"."UserID" FROM "Reports" LEFT OUTER JOIN "Mobiles" ON 
        "Reports"."NRWUserID" = "Mobiles"."UserID" :: VARCHAR ORDER BY "Reports"."updatedAt" DESC LIMIT 5 OFFSET ${offset}`
          );

          const count = await Reports.count();
          const leaks = await Reports.count();
          const bursts = await Reports.count();
          const illegal = await Reports.count({
            where: { Type: "Illegal Connection" },
          });
          const supply = await Reports.count({
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
    Reports.findAll({
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
    Reports.count({
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
    Reports.findAll({}).then(
      async (result) => {
        const status = await sequelize.query(
          `SELECT "Reports"."Status", count(*)
        FROM "Reports" GROUP BY "Reports"."Status"`
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
        `SELECT "Reports"."Status", count(*) FROM "Reports" WHERE "Type" = '${type}' GROUP BY "Reports"."Status"`
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
          FROM "Reports"
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

exports.findReportByType = (type, offset) => {
  return new Promise(async (resolve, reject) => {
    Reports.findAll({
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
          `SELECT "Reports".*, "Mobiles"."Name" FROM "Reports" LEFT OUTER JOIN "Mobiles" ON "Mobiles"."UserID"::varchar = "Reports"."NRWUserID" WHERE "Reports"."Type" = '${type}' LIMIT 5 OFFSET ${offset}`
        );
        const count = await sequelize.query(
          `SELECT COUNT(*) FROM "Reports" WHERE "Type" = '${type}'`
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

exports.findAllReportByType = (type) => {
  return new Promise(async (resolve, reject) => {
    Reports.findAll({
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

exports.findReportByID = (id) => {
  return new Promise((resolve, reject) => {
    Reports.findByPk(id).then(
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

exports.updateReportByID = (ReportsData, id) => {
  console.log(ReportsData);

  return new Promise(async (resolve, reject) => {
    try {
      const Images = `${ReportsData.Type}-${Date.now()}.png`;
      createFileFromBase64(ReportsData.TaskImage, Images);
      ReportsData.TaskImage = Images;
      Reports.update(ReportsData, {
        where: { ID: id },
      });

      resolve({
        success: "Updated Successfully",
        ID: id,
      });
    } catch (error) {
      reject({ error: error.message ?? "Report Update Failed" });
    }
  });
};

exports.deleteReportByID = (id) => {
  return new Promise((resolve, reject) => {
    Reports.destroy({
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
    Reports.findAll({
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
    Reports.findAll({
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
    Reports.findAll({}).then(
      async (result) => {
        const count = await Reports.count({});
        const clients = await Reports.count({
          col: "Client",
          distinct: true,
        });
        const type = await Reports.count({
          col: "Type",
          distinct: true,
        });
        const typeSum = await sequelize.query(
          `SELECT "Reports"."Type", COUNT(*) AS count FROM "Reports" GROUP BY "Reports"."Type"`
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

exports.findReportTypeCount = (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT "Reports"."Status",  COUNT(*) FROM "Reports"  WHERE "Reports"."Type" = '${type}' GROUP BY "Reports"."Status"`
      );
      resolve({ result });
    } catch (error) {
      reject({ error: "Retrieve failed!" });
    }
  });
};

exports.findEachReportType = (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT "Reports"."Status",  COUNT(*) FROM "Reports"  WHERE "Reports"."Type" = '${type}' GROUP BY "Reports"."Status"`
      );
      resolve({ result });
    } catch (error) {
      reject({ error: "Retrieve failed!" });
    }
  });
};

exports.findReportByStatus = (status, offset) => {
  return new Promise(async (resolve, reject) => {
    Reports.findAll({
      where: {
        Status: status,
      },
      offset: offset,
      limit: 5,
    }).then(
      async (result) => {
        const [results, metadata] = await sequelize.query(
          `SELECT "Reports".*, "Mobiles"."Name" FROM "Reports" LEFT OUTER JOIN "Mobiles" ON "Mobiles"."UserID"::varchar = "Reports"."NRWUserID" WHERE "Reports"."Status" = '${status}' LIMIT 5 OFFSET ${offset}`
        );
        const count = await Reports.count({
          where: {
            Status: status,
          },
        });
        const leaks = await Reports.count({
          where: { Status: status, Type: "Leakage" },
        });
        const bursts = await Reports.count({
          where: { Status: status, Type: "Sewer Burst" },
        });
        const illegal = await Reports.count({
          where: { Status: status, Type: "Illegal Connection" },
        });
        const supply = await Reports.count({
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
        `SELECT "Reports".*, "Mobiles"."Name" FROM "Reports" LEFT OUTER JOIN "Mobiles" ON "Mobiles"."UserID"::varchar = "Reports"."NRWUserID" WHERE "Reports"."ID" = '${id}'`
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
        `SELECT Count(*)::int as total FROM public."Reports" WHERE "createdAt"::Date >= '${start}'
        AND "createdAt"::Date <= '${end}'`
      );
      const [lkg, lkgmeta] = await sequelize.query(
        `SELECT Count(*)::int as total FROM public."Reports" WHERE "Type" = 'Leakage'
        AND "createdAt"::Date >= '${start}' AND "createdAt"::Date <= '${end}'`
      );
      const [swr, swrmeta] = await sequelize.query(
        `SELECT Count(*)::int as total FROM public."Reports" WHERE "Type" = 'Sewer Burst'
        AND "createdAt"::Date >= '${start}' AND "createdAt"::Date <= '${end}'`
      );
      const [ill, illmeta] = await sequelize.query(
        `SELECT Count(*)::int as total FROM public."Reports" WHERE "Type" = 'Illegal Connection'
        AND "createdAt"::Date >= '${start}' AND "createdAt"::Date <= '${end}'`
      );
      const [sf, sfmeta] = await sequelize.query(
        `SELECT Count(*)::int as total FROM public."Reports" WHERE "Type" = 'Supply Fail'
        AND "createdAt"::Date >= '${start}' AND "createdAt"::Date <= '${end}'`
      );
      const [vand, vandmeta] = await sequelize.query(
        `SELECT Count(*)::int as total FROM public."Reports" WHERE "Type" = 'Vandalism'
        AND "createdAt"::Date >= '${start}' AND "createdAt"::Date <= '${end}'`
      );
      const [other, othermeta] = await sequelize.query(
        `SELECT Count(*)::int as total FROM public."Reports" WHERE "Type" = 'Other'
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
        `SELECT "Status" AS name,Count(*)::int AS value FROM public."Reports" WHERE "Type" = 'Leakage' 
        AND "createdAt"::Date >= '${start}' AND "createdAt"::Date <= '${end}' GROUP BY "Status"`
      );
      const [swr, swrmeta] = await sequelize.query(
        `SELECT "Status" AS name,Count(*)::int AS value FROM public."Reports" WHERE "Type" = 'Sewer Burst'
        AND "createdAt"::Date >= '${start}' AND "createdAt"::Date <= '${end}' GROUP BY "Status"`
      );

      const [ill, illmeta] = await sequelize.query(
        `SELECT "Status" AS name,Count(*)::int AS value FROM public."Reports" WHERE "Type" = 'Illegal Connection' 
        AND "createdAt"::Date >= '${start}' AND "createdAt"::Date <= '${end}' GROUP BY "Status"`
      );
      const [sf, sfmeta] = await sequelize.query(
        `SELECT "Status" AS name,Count(*)::int AS value FROM public."Reports" WHERE "Type" = 'Supply Fail' 
        AND "createdAt"::Date >= '${start}' AND "createdAt"::Date <= '${end}' GROUP BY "Status"`
      );
      const [vand, vandmeta] = await sequelize.query(
        `SELECT "Status" AS name,Count(*)::int AS value FROM public."Reports" WHERE "Type" = 'Vandalism'
        AND "createdAt"::Date >= '${start}' AND "createdAt"::Date <= '${end}' GROUP BY "Status"`
      );
      const [other, othermeta] = await sequelize.query(
        `SELECT "Status" AS name,Count(*)::int AS value FROM public."Reports" WHERE "Type" = 'Other' 
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

exports.findAllReportsPaginated = (type, offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      let typeQuery = "";
      if (type != "All") {
        typeQuery = `WHERE "Reports"."Type" = '${type}'`;
      }

      const [result, metadata] = await sequelize.query(
        `SELECT * FROM "Reports" ${typeQuery}  ORDER BY "createdAt" DESC LIMIT 12 OFFSET ${offset}`
      );

      const [count, cmeta] = await sequelize.query(
        `SELECT Count(*)::int AS total FROM "Reports" ${typeQuery}`
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
        typeQuery = `WHERE "Reports"."Type" = '${type}'`;
      }

      const [result, metadata] = await sequelize.query(
        `SELECT * FROM "Reports" ${typeQuery}`
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
            Name: report.Name,
            Phone: report.Phone,
            Description: report.Description,
            Status: report.Status,
            NRWUserID: report.NRWUserID,
            UserID: report.UserID,
            TaskResources: report.TaskResources,
            TaskRemarks: report.TaskRemarks,
            TaskDate: report.TaskDate,
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

exports.searchReports = (col, val) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT "Reports"."ID","Reports"."Latitude", "Reports"."Longitude", "Reports"."SerialNo",
        "Reports"."Type", "Reports"."Description", "Reports"."createdAt" AS "DateReported", "Reports"."Phone" AS "ReportedBy",
        "Reports"."Status", "Mobiles"."Name" AS "AssignedTo", "Reports"."updatedAt" AS "DateResolved"
        FROM "Reports" LEFT OUTER JOIN "Mobiles" ON "Reports"."NRWUserID" = "Mobiles"."UserID" :: VARCHAR
        LEFT OUTER JOIN "PublicUsers" ON "Reports"."UserID"::varchar = "PublicUsers"."UserID"::varchar
        WHERE "Reports"."${col}"::varchar ILIKE '%${val}%'
        ORDER BY "DateReported" DESC `
      );
      const [count, mdata] = await sequelize.query(
        `SELECT COUNT(*) FROM "Reports" WHERE "${col}"::varchar ILIKE '%${val}%'`
      );
      resolve({
        data: result,
        total: count[0].count,
      });
    } catch (error) {
      console.log(error);
      reject({ error: "Retrieve failed!" });
    }
  });
};

exports.paginatedSearchReports = (column, value, offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT "Reports"."ID","Reports"."Latitude", "Reports"."Longitude", "Reports"."SerialNo", "Reports"."Name",
        "Reports"."Type", "Reports"."Description",  "Reports"."createdAt" AS "DateReported", "Reports"."Phone" AS "ReportedBy",
        "Reports"."Status", "Mobiles"."Name" AS "AssignedTo", "Reports"."updatedAt" AS "DateResolved"
        FROM "Reports" LEFT OUTER JOIN "Mobiles" ON "Reports"."NRWUserID" = "Mobiles"."UserID" :: VARCHAR
        LEFT OUTER JOIN "PublicUsers" ON "Reports"."UserID"::varchar = "PublicUsers"."UserID"::varchar
        WHERE "Reports"."${column}"::varchar ILIKE '%${value}%'
        ORDER BY "DateReported" DESC LIMIT 12 OFFSET ${offset} `
      );
      const [count, mdata] = await sequelize.query(
        `SELECT COUNT(*) FROM "Reports" WHERE "${column}"::varchar ILIKE '%${value}%'`
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

exports.filterReports = (column, operator, value) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT "Reports"."ID","Reports"."Latitude", "Reports"."Longitude", "Reports"."SerialNo",
        "Reports"."Type", "Reports"."Description",  "Reports"."createdAt" AS "DateReported", "Reports"."Phone" AS "ReportedBy",
        "Reports"."Status", "Mobiles"."Name" AS "AssignedTo", "Reports"."updatedAt" AS "DateResolved"
        FROM "Reports" LEFT OUTER JOIN "Mobiles" ON "Reports"."NRWUserID" = "Mobiles"."UserID" :: VARCHAR
        LEFT OUTER JOIN "PublicUsers" ON "Reports"."UserID"::varchar = "PublicUsers"."UserID"::varchar
         WHERE "Reports"."${column}" ${operator} '${value}' ORDER BY "DateReported" DESC`
      );

      const [count, cmetadata] = await sequelize.query(
        `SELECT Count(*)::int AS total FROM "Reports" WHERE "${column}" ${operator} '${value}'`
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

exports.paginatedFilterReports = (column, operator, value, offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT "Reports"."ID","Reports"."Latitude", "Reports"."Longitude", "Reports"."SerialNo", "Reports"."Name",
        "Reports"."Type", "Reports"."Description",  "Reports"."createdAt" AS "DateReported", "Reports"."Phone" AS "ReportedBy",
        "Reports"."Status", "Mobiles"."Name" AS "AssignedTo", "Reports"."updatedAt" AS "DateResolved"
        FROM "Reports" LEFT OUTER JOIN "Mobiles" ON "Reports"."NRWUserID" = "Mobiles"."UserID" :: VARCHAR
        LEFT OUTER JOIN "PublicUsers" ON "Reports"."UserID"::varchar = "PublicUsers"."UserID"::varchar
         WHERE "Reports"."${column}" ${operator} '${value}' LIMIT 12 OFFSET ${offset}`
      );

      const [count, cmetadata] = await sequelize.query(
        `SELECT Count(*)::int AS total FROM "Reports" WHERE "${column}" ${operator} '${value}'`
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

exports.getReportsReportedByUserId = (id, offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT "Reports".*,"PublicUsers".* FROM "Reports" INNER JOIN "PublicUsers" ON 
        "Reports"."UserID" = "PublicUsers"."UserID"::VARCHAR WHERE "Reports"."UserID" = '${id}'
        ORDER BY "Reports"."createdAt" DESC LIMIT 12 OFFSET ${offset}`
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
        `SELECT * FROM "Reports" WHERE "SerialNo" = '${value}' LIMIT 1 OFFSET 0`
      );
      resolve(result);
    } catch (error) {
      reject([]);
    }
  });
};
