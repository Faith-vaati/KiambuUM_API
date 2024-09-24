const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const ProductionMeterReadings = require("../../models/ProductionMeterReadings")(
  sequelize,
  Sequelize
);

const fs = require("fs");
const Path = require("path");

ProductionMeterReadings.sync({ force: false });

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

exports.create = (ProductionMeterReadingsData) => {
  return new Promise(async (resolve, reject) => {
    if (
      ProductionMeterReadingsData.Units === undefined ||
      ProductionMeterReadingsData.MeterName === undefined
    ) {
      reject({ error: "Body is required" });
    }
    try {
      const Images = `${ProductionMeterReadingsData.Type}-${
        ProductionMeterReadingsData.MeterName
      }-${ProductionMeterReadingsData.Date}-${Date.now()}.png`;
      createFileFromBase64(ProductionMeterReadingsData.Image, Images);
      ProductionMeterReadingsData.Image = Images;
      const createdMeter = await ProductionMeterReadings.create(
        ProductionMeterReadingsData
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

exports.findProductionMeterReadingsById = (id) => {
  return new Promise((resolve, reject) => {
    ProductionMeterReadings.findByPk(id).then(
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

exports.updateProductionMeterReadingsById = (
  ProductionMeterReadingsData,
  id
) => {
  return new Promise((resolve, reject) => {
    ProductionMeterReadings.update(ProductionMeterReadingsData, {
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

exports.deleteProductionMeterReadingById = (id) => {
  return new Promise((resolve, reject) => {
    ProductionMeterReadings.destroy({
      where: {
        ID: id,
      },
    }).then(
      (result) => {
        if (result != 0) resolve({ success: "Deleted successfully!!!" });
        else reject({ error: "ProductionMeterReading does not exist!!!" });
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.findAllProductionMeterReadings = () => {
  return new Promise((resolve, reject) => {
    ProductionMeterReadings.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: err });
      }
    );
  });
};

exports.findProductionMeterReadingsPaginated = (offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [results, metadata] = await sequelize.query(
        `SELECT * FROM "ProductionMeterReadings"  ORDER BY "createdAt" LIMIT 12 OFFSET ${offset}`
      );
      const [count, cmeta] = await sequelize.query(
        `SELECT Count(*)::int AS total FROM "ProductionMeterReadings"`
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
