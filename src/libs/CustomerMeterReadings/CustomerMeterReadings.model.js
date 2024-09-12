const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const CustomerMeterReadings = require("../../models/CustomerMeterReadings")(
  sequelize,
  Sequelize
);

const fs = require("fs");
const Path = require("path");

CustomerMeterReadings.sync({ force: false });

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

exports.create = (CustomerMeterReadingsData) => {
  return new Promise(async (resolve, reject) => {
    if (
      CustomerMeterReadingsData.Units === undefined ||
      CustomerMeterReadingsData.AccountNumber === undefined
    ) {
      reject({ error: "Body is required" });
    }
    try {
      const Images = `${CustomerMeterReadingsData.AccountNumber}-${Date.now()}.png`;
      createFileFromBase64(CustomerMeterReadingsData.Image, Images);
      CustomerMeterReadingsData.Image = Images;
      const createdMeter = await CustomerMeterReadings.create(CustomerMeterReadingsData);
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

exports.findCustomerMeterReadingsById = (id) => {
  return new Promise((resolve, reject) => {
    CustomerMeterReadings.findByPk(id).then(
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

exports.updateCustomerMeterReadingsById = (CustomerMeterReadingsData, id) => {
  return new Promise((resolve, reject) => {
    CustomerMeterReadings.update(CustomerMeterReadingsData, {
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
    CustomerMeterReadings.destroy({
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

exports.findAllCustomerMeterReadings = () => {
  return new Promise((resolve, reject) => {
    CustomerMeterReadings.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.findCustomerMeterReadingsPaginated = (offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [results, metadata] = await sequelize.query(
        `SELECT * FROM "CustomerMeterReadings"  ORDER BY "createdAt" LIMIT 12 OFFSET ${offset}`
      );
      const [count, cmeta] = await sequelize.query(
        `SELECT Count(*)::int AS total FROM "CustomerMeterReadings"`
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
