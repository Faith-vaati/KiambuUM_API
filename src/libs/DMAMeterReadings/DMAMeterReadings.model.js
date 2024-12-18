const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const DMAMeterReadings = require("../../models/DMAMeterReadings")(
  sequelize,
  Sequelize
);

const fs = require("fs");
const Path = require("path");

DMAMeterReadings.sync({ force: false });

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

exports.create = (DMAMeterReadingsData) => {
  return new Promise(async (resolve, reject) => {
    if (
      DMAMeterReadingsData.Units === undefined ||
      DMAMeterReadingsData.DMAName === undefined
    ) {
      reject({ error: "Body is required" });
    }
    try {
      const Images = `${DMAMeterReadingsData.DMAName}-${
        DMAMeterReadingsData.Date
      }-${Date.now()}.png`;
      createFileFromBase64(DMAMeterReadingsData.Image, Images);
      DMAMeterReadingsData.Image = Images;
      const createdMeter = await DMAMeterReadings.create(DMAMeterReadingsData);
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

exports.findDMAMeterReadingsById = (id) => {
  return new Promise((resolve, reject) => {
    DMAMeterReadings.findByPk(id).then(
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

exports.updateDMAMeterReadingsById = (DMAMeterReadingsData, id) => {
  return new Promise((resolve, reject) => {
    DMAMeterReadings.update(DMAMeterReadingsData, {
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

exports.deleteDMAMeterReadingById = (id) => {
  return new Promise((resolve, reject) => {
    DMAMeterReadings.destroy({
      where: {
        ID: id,
      },
    }).then(
      (result) => {
        if (result != 0) resolve({ success: "Deleted successfully!!!" });
        else reject({ error: "DMAMeterReading does not exist!!!" });
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.findAllDMAMeterReadings = () => {
  return new Promise((resolve, reject) => {
    DMAMeterReadings.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.findDailyReadings = (start, end, offset) => {
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
         FROM "DMAMeterReadings" B
         WHERE B."DMAName" = A."DMAName" 
           AND CAST(B."Date" AS DATE) = CAST(A."Date" AS DATE) - INTERVAL '1 day'
         LIMIT 1), 0)) AS "Consumption",
    A."createdAt",
    A."updatedAt"
FROM
    "DMAMeterReadings" A
WHERE
    CAST(A."Date" AS DATE) >= '${start}' AND CAST(A."Date" AS DATE) <= '${end}'
ORDER BY
    A."Date" DESC LIMIT 12 OFFSET '${offset}'`
      );

      const [count, cmeta] =
        await sequelize.query(`SELECT COUNT (*) ::int AS total FROM "DMAMeterReadings"
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

exports.findReadingAnalysis = (start, end) => {
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
         FROM "DMAMeterReadings" B
         WHERE B."DMAName" = A."DMAName" 
           AND CAST(B."Date" AS DATE) = CAST(A."Date" AS DATE) - INTERVAL '1 day'
         LIMIT 1), 0)) AS "Consumption",
    A."createdAt",
    A."updatedAt"
FROM
    "DMAMeterReadings" A
WHERE
    CAST(A."Date" AS DATE) >= '${start}' AND CAST(A."Date" AS DATE) <= '${end}'
ORDER BY
    A."Date" DESC `
      );

      const [count, cmeta] =
        await sequelize.query(`SELECT COUNT (*) ::int AS total FROM "DMAMeterReadings"
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
        `WITH RankedReadings AS (
    SELECT
        "DMAName",
        "MeterStatus",
        "Image",
        "Date",
        "createdAt",
        CAST("Units" AS FLOAT) AS "Units",
        LAG(CAST("Units" AS FLOAT)) OVER (
            PARTITION BY "DMAName"
            ORDER BY "Date"
        ) AS "PreviousUnits"
    FROM "DMAMeterReadings"
    WHERE "DMAName" = '${dma}'
),
FilteredReadings AS (
    SELECT
        "DMAName",
        "MeterStatus",
        "Image",
        "Date",
        "createdAt",
        "Units",
        "PreviousUnits"
    FROM RankedReadings
    WHERE "PreviousUnits" IS NOT NULL
)
SELECT
    "DMAName",
    "MeterStatus",
    "Image",
    "Date",
    "createdAt",
    "Units",
    ("Units" - "PreviousUnits") AS "Consumption"
FROM FilteredReadings
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
        `SELECT * FROM "DMAMeterReadings" WHERE "DMAName" ILIKE '%${dma}%' ORDER BY "Date" DESC`
      );
      resolve({
        data: data,
      });
    } catch (error) {
      reject({ error: "Retrieve failed" });
    }
  });
};
