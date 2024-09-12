const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const BulkMeterReadings = require("../../models/BulkMeterReadings")(
  sequelize,
  Sequelize
);

const fs = require("fs");
const Path = require("path");

BulkMeterReadings.sync({ force: false });

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

exports.create = (BulkMeterReadingsData) => {
  return new Promise(async (resolve, reject) => {
    if (
      BulkMeterReadingsData.Units === undefined ||
      BulkMeterReadingsData.DMAName === undefined
    ) {
      reject({ error: "Body is required" });
    }
    try {
      const Images = `${BulkMeterReadingsData.DMAName}-${
        BulkMeterReadingsData.Date
      }-${Date.now()}.png`;
      createFileFromBase64(BulkMeterReadingsData.Image, Images);
      BulkMeterReadingsData.Image = Images;
      const createdMeter = await BulkMeterReadings.create(
        BulkMeterReadingsData
      );
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

exports.findBulkMeterReadingsById = (id) => {
  return new Promise((resolve, reject) => {
    BulkMeterReadings.findByPk(id).then(
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

exports.updateBulkMeterReadingsById = (BulkMeterReadingsData, id) => {
  return new Promise((resolve, reject) => {
    BulkMeterReadings.update(BulkMeterReadingsData, {
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

exports.deleteCustomerMeterReadingById = (id) => {
  return new Promise((resolve, reject) => {
    BulkMeterReadings.destroy({
      where: {
        ID: id,
      },
    }).then(
      (result) => {
        if (result != 0) resolve({ success: "Deleted successfully!!!" });
        else reject({ error: "CustomerMeterReading does not exist!!!" });
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.findAllBulkMeterReadings = () => {
  return new Promise((resolve, reject) => {
    BulkMeterReadings.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.findBulkMeterReadingsPaginated = (offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [results, metadata] = await sequelize.query(
        `SELECT * FROM "BulkMeterReadings"  ORDER BY "createdAt" LIMIT 12 OFFSET ${offset}`
      );
      const [count, cmeta] = await sequelize.query(
        `SELECT Count(*)::int AS total FROM "BulkMeterReadings"`
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
