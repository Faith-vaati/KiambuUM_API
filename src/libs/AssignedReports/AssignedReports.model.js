const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const AssignedReport = require("../../models/AssignedReports")(
  sequelize,
  Sequelize
);

const Path = require("path");

AssignedReport.sync({ force: false });

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

exports.create = (AssignedReportData) => {
  return new Promise(async (resolve, reject) => {
    if (AssignedReportData.ReportID === undefined) {
      reject({ error: "Body is required" });
    }
    try {
      const Images = `"Resolved"-${
        AssignedReportData.ReportsID
      }-${Date.now()}.png`;
      createFileFromBase64(AssignedReportData.Image, Images);
      AssignedReportData.Image = Images;
      const createdReport = await AssignedReport.create(AssignedReportData);
      resolve({
        success: "Submitted Successfully",
      });
    } catch (error) {
      reject({ error: error.message ?? "Creation failed" });
    }
  });
};

exports.findAssignedReportById = (id) => {
  return new Promise((resolve, reject) => {
    AssignedReport.findByPk(id).then(
      (result) => {
        if (result == null) {
          reject({ status: 404, error: "AssignedReport not found" });
        }
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findResolutionByReportID = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, metadata] = await sequelize.query(
        `
                SELECT "AssignedReports"."ID","AssignedReports"."NRWUserID", "AssignedReports"."TaskImage", "AssignedReports"."ResolvedDate", "AssignedReports"."ResolvedTime", "AssignedReports"."Remark", "AssignedReports"."Status", "AssignedReports"."ReportsID", "Reports"."Latitude", "Reports"."Longitude", "Reports"."SerialNo", "Reports"."Type", "Reports"."Description", "Reports"."Status", "Mobiles"."Name" AS "AssignedTo" FROM "AssignedReports"
                LEFT OUTER JOIN "Reports" ON "AssignedReports"."ReportsID" = "Reports"."ID"
                LEFT OUTER JOIN "Mobiles" ON "AssignedReports"."NRWUserID" = "Mobiles"."UserID"
                WHERE "AssignedReports"."ReportsID" = '${id}' ORDER BY "AssignedReports"."ResolvedDate" DESC
                `
      );

      resolve(data);
    } catch (error) {
      reject({ error: "Retrieve failed" });
    }
  });
};

exports.updateAssignedReportById = (AssignedReportData, id) => {
  return new Promise((resolve, reject) => {
    AssignedReport.update(AssignedReportData, {
      where: {
        ID: id,
      },
    }).then(
      (result) => {
        resolve({ success: "Updated successfully" });
      },
      (err) => {
        reject({ error: "Update failed" });
      }
    );
  });
};

exports.deleteAssignedReportById = (id) => {
  return new Promise((resolve, reject) => {
    AssignedReport.destroy({
      where: {
        ID: id,
      },
    }).then(
      (result) => {
        if (result == 0) {
          reject({ status: 404, error: "AssignedReport not found" });
        }
        resolve({ success: "Deleted successfully" });
      },
      (err) => {
        reject({ error: "Delete failed" });
      }
    );
  });
};

exports.findAllAssignedReports = () => {
  return new Promise((resolve, reject) => {
    AssignedReport.findAll().then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};
