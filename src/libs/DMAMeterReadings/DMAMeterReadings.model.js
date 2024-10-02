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

exports.findDailyReadings = (start, end) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, metadata] = await sequelize.query(
        `SELECT * FROM "DMAMeterReadings" WHERE "Date" >= '${start}' AND "Date" <= '${end}'`
      );
      resolve({
        data: data,
      });
    } catch (error) {
      reject({ error: "Retrieve failed" });
    }
  });
};
