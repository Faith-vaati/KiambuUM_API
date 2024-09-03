const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const MeterReadings = require("../../models/MeterReadings")(
  sequelize,
  Sequelize
);

const fs = require("fs");
const Path = require("path");

MeterReadings.sync({ force: false });

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

exports.create = (MeterReadingsData) => {
  return new Promise(async (resolve, reject) => {
    if (
      MeterReadingsData.Units === undefined ||
      MeterReadingsData.AccountNumber === undefined
    ) {
      reject({ error: "Body is required" });
    }
    try {
      const Images = `${MeterReadingsData.AccountNumber}-${Date.now()}.png`;
      createFileFromBase64(MeterReadingsData.Image, Images);
      MeterReadingsData.Image = Images;
      const createdMeter = await Reports.create(MeterReadingsData);
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

exports.findMeterReadingsById = (id) => {
  return new Promise((resolve, reject) => {
    MeterReadings.findByPk(id).then(
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

exports.updateMeterReadingsById = (MeterReadingsData, id) => {
  return new Promise((resolve, reject) => {
    MeterReadings.update(MeterReadingsData, {
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

exports.deleteMeterReadingById = (id) => {
  return new Promise((resolve, reject) => {
    MeterReadings.destroy({
      where: {
        ID: id,
      },
    }).then(
      (result) => {
        if (result != 0) resolve({ success: "Deleted successfully!!!" });
        else reject({ error: "MeterReading does not exist!!!" });
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.findAllMeterReadings = () => {
  return new Promise((resolve, reject) => {
    MeterReadings.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.findMeterReadingsPaginated = (offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [results, metadata] = await sequelize.query(
        `SELECT * FROM "MeterReadings"  ORDER BY "createdAt" LIMIT 12 OFFSET ${offset}`
      );
      const [count, cmeta] = await sequelize.query(
        `SELECT Count(*)::int AS total FROM "MeterReadings"`
      );
      resolve({
        data: results,
        total: count[0].total,
      });
    } catch (error) {
      reject({ error: "Retrieve failed" });
    }
  });
};
