const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const NRWMeterReadings = require("../../models/NRWMeterReading")(
  sequelize,
  Sequelize
);

const fs = require("fs");
const Path = require("path");

NRWMeterReadings.sync({ force: false });

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
    if (
      NRWMeterReadingsData.Interval === undefined ||
      NRWMeterReadingsData.DMAName === undefined
    ) {
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
    NRWMeterReadings.destroy({
      where: {
        ID: id,
      },
    }).then(
      (result) => {
        if (result != 0) resolve({ success: "Deleted successfully!!!" });
        else reject({ error: "NRWMeterReading does not exist!!!" });
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
          ? `WHERE "NRWMeterReadings"."MeterType" = '${type}' AND "DMAName" = '${dma}' 
          AND "FirstReadingDate"::Date >= '${start}' AND "FirstReadingDate"::Date <= '${end}'`
          : type !== "All" && dma === "All"
          ? `WHERE "NRWMeterReadings"."MeterType" = '${type}' AND "FirstReadingDate"::Date >= '${start}' AND "FirstReadingDate"::Date <= '${end}'`
          : type === "All" && dma !== "All"
          ? `WHERE "NRWMeterReadings"."DMAName" = '${dma}' AND "FirstReadingDate"::Date >= '${start}' AND "FirstReadingDate"::Date <= '${end}'`
          : type === "All" && dma === "All"
          ? `WHERE "FirstReadingDate"::Date >= '${start}' AND "FirstReadingDate"::Date <= '${end}'`
          : "";

      const [result, meta] = await sequelize.query(
        `SELECT * FROM "NRWMeterReadings" ${typeQuery} ORDER BY "createdAt" DESC `
      );
      const [count, mdata] = await sequelize.query(
        `SELECT COUNT(*)::int AS total FROM "NRWMeterReadings" ${typeQuery}`
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
