const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const NRWMeterReadings = require("../../models/NRWMeterReading")(
  sequelize,
  Sequelize
);

const fs = require("fs");
const Path = require("path");

NRWMeterReadings.sync({ force: false });

const executeQueryWithRetry = async (query, params = {}, maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await sequelize.query(query, {
        replacements: params,
        type: sequelize.QueryTypes.SELECT,
      });
      return result;
    } catch (error) {
      if (attempt === maxRetries) throw error;
      // Wait before retrying (exponential backoff)
      await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
      // Ensure connection is alive
      try {
        await sequelize.authenticate();
      } catch (e) {
        console.log("Reconnecting to database...");
      }
    }
  }
};

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

exports.create = (NRWMeterReadingsData) => {
  return new Promise(async (resolve, reject) => {
    if (NRWMeterReadingsData.DMAName === undefined) {
      reject({ error: "Body is required" });
    }
    try {
      const Images = `${NRWMeterReadingsData.DMAName}-${
        NRWMeterReadingsData.Date
      }-${Date.now()}.png`;
      createFileFromBase64(NRWMeterReadingsData.Image, Images);
      NRWMeterReadingsData.Image = Images;
      const createdMeter = await NRWMeterReadings.create(NRWMeterReadingsData);
      const id = createdMeter.dataValues.ID;

      resolve({
        success: "Submitted successfully",
        ID: id,
      });
    } catch (error) {
      reject({ error: error.message ?? "Submission failed" });
    }
  });
};

exports.findNRWMeterReadingsById = (id) => {
  return new Promise((resolve, reject) => {
    NRWMeterReadings.findByPk(id).then(
      (result) => {
        if (result == null) {
          reject({ error: "Not found" });
        }
        resolve(result);
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.updateNRWMeterReadingsById = (NRWMeterReadingsData, id) => {
  return new Promise((resolve, reject) => {
    NRWMeterReadings.update(NRWMeterReadingsData, {
      where: {
        ID: id,
      },
    }).then(
      (result) => {
        resolve({ success: "Updated successfully!" });
      },
      (err) => {
        reject({ error: "Update failed!" });
      }
    );
  });
};

exports.deleteNRWMeterReadingById = (id) => {
  return new Promise((resolve, reject) => {
    NRWMeterReadings.update(
      { deletedAt: new Date() },
      {
        where: {
          ID: id,
          deletedAt: null,
        },
      }
    ).then(
      (result) => {
        if (result[0] !== 0) resolve({ success: "Deleted successfully!!!" });
        else
          reject({
            error: "NRWMeterReading does not exist or is already deleted!!!",
          });
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.findAllNRWMeterReadings = () => {
  return new Promise((resolve, reject) => {
    NRWMeterReadings.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.findNRWReadings = (start, end, offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, metadata] = await sequelize.query(
        `SELECT DISTINCT
    A."DMAName",
    CAST(A."Units" AS FLOAT) AS "Units",
    A."MeterStatus",
    A."Image",
    A."Date",
    (CAST(A."Units" AS FLOAT) - COALESCE(
        (SELECT CAST(B."Units" AS FLOAT)
         FROM "NRWMeterReadings" B
         WHERE B."DMAName" = A."DMAName" 
           AND CAST(B."Date" AS DATE) = CAST(A."Date" AS DATE) - INTERVAL '1 day'
         LIMIT 1), 0)) AS "Consumption",
    A."createdAt",
    A."updatedAt"
FROM
    "NRWMeterReadings" A
WHERE
    CAST(A."Date" AS DATE) >= '${start}' AND CAST(A."Date" AS DATE) <= '${end}'
ORDER BY
    A."Date" DESC LIMIT 12 OFFSET '${offset}'`
      );

      const [count, cmeta] =
        await sequelize.query(`SELECT COUNT (*) ::int AS total FROM "NRWMeterReadings"
        WHERE CAST("Date" AS DATE) >= '${start}' AND CAST("Date" AS DATE) <= '${end}'`);

      resolve({
        data: data,
        total: count[0].total,
      });
    } catch (error) {
      reject({ error: "Retrieve failed" });
    }
  });
};

exports.findDMAReadings = (dma) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, metadata] = await sequelize.query(
        `SELECT  
    A."DMAName", 
    A."MeterStatus", 
    A."Image", 
    A."Date", 
    A."createdAt",
    CAST(A."Units" AS FLOAT) AS "Units",
    (CAST(A."Units" AS FLOAT) - COALESCE(
        (SELECT CAST(B."Units" AS FLOAT)
         FROM "NRWMeterReadings" B 
         WHERE B."DMAName" = A."DMAName" 
           AND B."Date" = (
                SELECT MAX("Date") 
                FROM "NRWMeterReadings" 
                WHERE "DMAName" = A."DMAName" 
                  AND "Date" < A."Date"
            )
         ORDER BY B."Date" DESC
         LIMIT 1
        ), 0)
    ) AS "Consumption"
FROM 
    "NRWMeterReadings" A
WHERE 
    A."DMAName" = '${dma}'
ORDER BY "Date" DESC;`
      );
      resolve({
        data: data,
      });
    } catch (error) {
      reject({ error: "Retrieve failed" });
    }
  });
};

exports.searchDMA = (dma) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, metadata] = await sequelize.query(
        `SELECT * FROM "NRWMeterReadings" WHERE "DMAName" ILIKE '%${dma}%' ORDER BY "Date" DESC`
      );
      resolve({
        data: data,
      });
    } catch (error) {
      reject({ error: "Retrieve failed" });
    }
  });
};

exports.findNRWReadingPaginated = (dma, type, start, end) => {
  return new Promise(async (resolve, reject) => {
    try {
      let typeQuery =
        type !== "All" && dma !== "All"
          ? `WHERE main."MeterType" = '${type}' AND main."DMAName" = '${dma}' 
          AND main."FirstReadingDate"::Date >= '${start}' AND main."FirstReadingDate"::Date <= '${end}' AND main."deletedAt" IS NULL`
          : type !== "All" && dma === "All"
          ? `WHERE main."MeterType" = '${type}' AND main."FirstReadingDate"::Date >= '${start}' AND main."FirstReadingDate"::Date <= '${end}' AND main."deletedAt" IS NULL`
          : type === "All" && dma !== "All"
          ? `WHERE main."DMAName" = '${dma}' AND main."FirstReadingDate"::Date >= '${start}' AND main."FirstReadingDate"::Date <= '${end}' AND main."deletedAt" IS NULL`
          : type === "All" && dma === "All"
          ? `WHERE main."FirstReadingDate"::Date >= '${start}' AND main."FirstReadingDate"::Date <= '${end}' AND main."deletedAt" IS NULL`
          : "";

      const masterMeterQuery = `
        WITH samaki2_raw AS (
          SELECT 
            (REPLACE("SecondReading", ' ', '')::numeric - REPLACE("FirstReading", ' ', '')::numeric) as samaki2_cons
          FROM "NRWMeterReadings"
          WHERE "DMAName" = 'Samaki 2'
          AND "MeterType" = 'Master Meter'
          AND "FirstReadingDate"::Date >= '${start}' 
          AND "FirstReadingDate"::Date <= '${end}'
          AND "deletedAt" IS NULL
          LIMIT 1
        ),
        samaki1_consumption AS (
          SELECT 
            (REPLACE("SecondReading", ' ', '')::numeric - REPLACE("FirstReading", ' ', '')::numeric) - 
            COALESCE((SELECT samaki2_cons FROM samaki2_raw), 0) as samaki1_cons
          FROM "NRWMeterReadings"
          WHERE "DMAName" = 'Samaki 1'
          AND "MeterType" = 'Master Meter'
          AND "FirstReadingDate"::Date >= '${start}' 
          AND "FirstReadingDate"::Date <= '${end}'
          AND "deletedAt" IS NULL
          LIMIT 1
        ),
        makanja2_raw AS (
          SELECT 
            (REPLACE("SecondReading", ' ', '')::numeric - REPLACE("FirstReading", ' ', '')::numeric) as makanja2_cons
          FROM "NRWMeterReadings"
          WHERE "DMAName" = 'Makanja 2'
          AND "MeterType" = 'Master Meter'
          AND "FirstReadingDate"::Date >= '${start}' 
          AND "FirstReadingDate"::Date <= '${end}'
          AND "deletedAt" IS NULL
          LIMIT 1
        )
        SELECT 
          main.*,
          CASE 
            WHEN main."DMAName" = 'Makanja 1' AND main."MeterType" = 'Master Meter' THEN
              (REPLACE(main."SecondReading", ' ', '')::numeric - REPLACE(main."FirstReading", ' ', '')::numeric) - 
              COALESCE((SELECT makanja2_cons FROM makanja2_raw), 0) - 
              COALESCE((SELECT samaki1_cons FROM samaki1_consumption), 0)
            WHEN main."DMAName" = 'Samaki 1' AND main."MeterType" = 'Master Meter' THEN
              (REPLACE(main."SecondReading", ' ', '')::numeric - REPLACE(main."FirstReading", ' ', '')::numeric) - 
              COALESCE((SELECT samaki2_cons FROM samaki2_raw), 0)
            ELSE
              (REPLACE(main."SecondReading", ' ', '')::numeric - REPLACE(main."FirstReading", ' ', '')::numeric)
          END AS "Consumption"`;

      const [result, meta] = await sequelize.query(
        `${masterMeterQuery}
        FROM "NRWMeterReadings" main
        ${typeQuery} 
        ORDER BY main."createdAt" DESC`
      );

      const [count, mdata] = await sequelize.query(
        `SELECT COUNT(*)::int AS total FROM "NRWMeterReadings" main ${typeQuery}`
      );

      resolve({
        data: result,
        total: count[0].total,
      });
    } catch (error) {
      console.log(error);
      reject({ error: "Retrieve Failed!" });
    }
  });
};

exports.dashboardAnalysis = (dma, start, end) => {
  return new Promise(async (resolve, reject) => {
    try {
      let dmaFilter = dma !== "All" ? `AND "DMAName" = :dma` : "";
      
      // Combine multiple queries into a single query for better performance
      const [result] = await sequelize.query(`
        WITH customer_stats AS (
          SELECT 
            COUNT(*)::int AS total_customers,
            COALESCE(SUM(
              (REPLACE("SecondReading", ' ', '')::numeric - REPLACE("FirstReading", ' ', '')::numeric)
            ), 0)::numeric AS customer_consumption
          FROM "NRWMeterReadings"
          WHERE "deletedAt" IS NULL 
          AND "FirstReadingDate"::Date >= :start 
          AND "FirstReadingDate"::Date <= :end
          AND "MeterType" = 'Customer Meter'
          ${dmaFilter}
        ),
        master_meter_stats AS (
          WITH samaki2_raw AS (
            SELECT 
              (REPLACE("SecondReading", ' ', '')::numeric - REPLACE("FirstReading", ' ', '')::numeric) as samaki2_cons
            FROM "NRWMeterReadings"
            WHERE "DMAName" = 'Samaki 2'
            AND "MeterType" = 'Master Meter'
            AND "FirstReadingDate"::Date >= :start 
            AND "FirstReadingDate"::Date <= :end
            AND "deletedAt" IS NULL
            LIMIT 1
          ),
          samaki1_consumption AS (
            SELECT 
              (REPLACE("SecondReading", ' ', '')::numeric - REPLACE("FirstReading", ' ', '')::numeric) - 
              COALESCE((SELECT samaki2_cons FROM samaki2_raw), 0) as samaki1_cons
            FROM "NRWMeterReadings"
            WHERE "DMAName" = 'Samaki 1'
            AND "MeterType" = 'Master Meter'
            AND "FirstReadingDate"::Date >= :start 
            AND "FirstReadingDate"::Date <= :end
            AND "deletedAt" IS NULL
            LIMIT 1
          )
          SELECT COALESCE(SUM(
            CASE 
              WHEN "DMAName" = 'Makanja 1' AND "MeterType" = 'Master Meter' THEN
                (REPLACE("SecondReading", ' ', '')::numeric - REPLACE("FirstReading", ' ', '')::numeric) - 
                COALESCE((SELECT samaki1_cons FROM samaki1_consumption), 0)
              WHEN "DMAName" = 'Samaki 1' AND "MeterType" = 'Master Meter' THEN
                (REPLACE("SecondReading", ' ', '')::numeric - REPLACE("FirstReading", ' ', '')::numeric) - 
                COALESCE((SELECT samaki2_cons FROM samaki2_raw), 0)
              WHEN "MeterType" = 'Master Meter' THEN
                (REPLACE("SecondReading", ' ', '')::numeric - REPLACE("FirstReading", ' ', '')::numeric)
              ELSE 0
            END
          ), 0)::numeric AS master_consumption
          FROM "NRWMeterReadings"
          WHERE "deletedAt" IS NULL 
          AND "FirstReadingDate"::Date >= :start 
          AND "FirstReadingDate"::Date <= :end
          ${dmaFilter}
        )
        SELECT 
          cs.total_customers AS "Customers",
          cs.customer_consumption AS "Cust_Cons",
          ms.master_consumption AS "Mast_Cons",
          (ms.master_consumption - cs.customer_consumption)::numeric(10,2) AS "NRW_Volume",
          CASE 
            WHEN ms.master_consumption > 0 THEN
              ((ms.master_consumption - cs.customer_consumption) / ms.master_consumption * 100)::numeric(10,2)
            ELSE 0
          END AS "NRW_Ratio"
        FROM customer_stats cs
        CROSS JOIN master_meter_stats ms
      `, {
        replacements: { dma, start, end },
        type: sequelize.QueryTypes.SELECT
      });

      resolve(result[0]);
    } catch (error) {
      console.error('Dashboard Analysis Error:', error);
      reject({ error: "Retrieve Failed!" });
    }
  });
};

exports.searchByAccountNo = (accountNo) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, meta] = await sequelize.query(
        `SELECT * FROM "NRWMeterReadings" 
         WHERE "AccountNo" = '${accountNo}'
         AND "FirstReading" IS NOT NULL 
        
         AND "FirstReadingDate"::date >= CURRENT_DATE - INTERVAL '7 days'
         ORDER BY "FirstReadingDate" DESC 
         LIMIT 1`
      );

      resolve({
        data: result[0] || null,
      });
    } catch (error) {
      reject({ error: "Search Failed!" });
    }
  });
};

exports.updateSecondReading = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.AccountNo || !data.SecondReading) {
        reject({ error: "Account number and second reading are required" });
        return;
      }

      // First get the existing record to get DMAName for image naming
      const [existingRecord] = await sequelize.query(
        `SELECT "DMAName", "FirstReadingDate" FROM "NRWMeterReadings" 
         WHERE "AccountNo" = :accountNo
         AND "FirstReading" IS NOT NULL
         AND "FirstReadingDate"::date >= CURRENT_DATE - INTERVAL '7 days'
         ORDER BY "FirstReadingDate" DESC 
         LIMIT 1`,
        {
          replacements: { accountNo: data.AccountNo },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      if (!existingRecord) {
        reject({ error: "No matching record found to update" });
        return;
      }

      // Handle SR_Image if provided
      let srImageFileName = null;
      if (data.SR_Image) {
        srImageFileName = `${existingRecord.DMAName}-SR-${Date.now()}.png`;
        await createFileFromBase64(data.SR_Image, srImageFileName);
      }

      // Update the record with second reading and SR_Image
      const [result] = await sequelize.query(
        `UPDATE "NRWMeterReadings"
         SET "SecondReading" = :secondReading,
             "SecondReadingDate" = CURRENT_TIMESTAMP,
             "SR_Image" = :srImage
         WHERE "AccountNo" = :accountNo
         AND "FirstReading" IS NOT NULL
         AND "FirstReadingDate"::date >= CURRENT_DATE - INTERVAL '7 days'
         RETURNING *`,
        {
          replacements: {
            accountNo: data.AccountNo,
            secondReading: data.SecondReading,
            srImage: srImageFileName,
          },
          type: sequelize.QueryTypes.UPDATE,
        }
      );

      if (result && result.length > 0) {
        resolve({ success: "Updated successfully" });
      } else {
        reject({ error: "No matching record found to update" });
      }
    } catch (error) {
      console.error("Update error:", error);
      reject({ error: "Update Failed!" });
    }
  });
};

exports.optimizeQueries = async () => {
  await sequelize.query(`
    CREATE INDEX IF NOT EXISTS idx_nrw_dma_date ON "NRWMeterReadings" ("DMAName", "FirstReadingDate");
    CREATE INDEX IF NOT EXISTS idx_nrw_meter_type ON "NRWMeterReadings" ("MeterType");
    CREATE INDEX IF NOT EXISTS idx_nrw_deleted ON "NRWMeterReadings" ("deletedAt");
  `);
};
