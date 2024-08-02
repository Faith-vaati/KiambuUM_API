const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const IncidentResolution = require("../../models/IncidentResolution")(sequelize, Sequelize);

const multer = require("multer");
const Path = require("path");

IncidentResolution.sync({ force: false });

let upload = multer({
  limits: { fileSize: 100000000 },
  fileFilter: (req, file, callback) => {
    const acceptableExtensions = [".jpg", ".jpeg", ".png"];
    if (!acceptableExtensions.includes(Path.extname(file.originalname))) {
      return callback(new Error("Unsupported format"));
    }
    const fileSize = parseInt(req.headers["content-length"]);
    if (fileSize > 100000000) {
      return callback(new Error("File is too Large!"));
    }
    callback(null, true);
  },
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: function (req, file, callback) {
      callback(null, Date.now() + file.originalname);
    },
  }),
});

exports.uploadFile = upload.single("TaskImage");

exports.createIncidentResolution = (IncidentResolutionData) => {
    return new Promise(async (resolve, reject) => {
        if (IncidentResolutionData.NRWUserID == null) {
            reject({ error: "IncidentResolution data is null" });
        }

        IncidentResolution.create(IncidentResolutionData).then(
            async (result) => {
                resolve({
                    success: "Created successfully",
                    token: result.dataValues.ID,
                });
            },
            (err) => {
                console.log(err);
                reject({ error: "IncidentResolution creation failed" });
            }
        );
    });
};

exports.findIncidentResolutionById = (id) => {
    return new Promise((resolve, reject) => {
        IncidentResolution.findByPk(id).then(
            (result) => {
                if (result == null) {
                    reject({ status: 404, error: "IncidentResolution not found" });
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
                SELECT "IncidentResolutions"."ID","IncidentResolutions"."NRWUserID", "IncidentResolutions"."TaskImage", "IncidentResolutions"."ResolvedDate", "IncidentResolutions"."ResolvedTime", "IncidentResolutions"."Remark", "IncidentResolutions"."Status", "IncidentResolutions"."ReportsID", "Reports"."Latitude", "Reports"."Longitude", "Reports"."SerialNo", "Reports"."Type", "Reports"."Description", "Reports"."Status", "Mobiles"."Name" AS "AssignedTo" FROM "IncidentResolutions"
                LEFT OUTER JOIN "Reports" ON "IncidentResolutions"."ReportsID" = "Reports"."ID"
                LEFT OUTER JOIN "Mobiles" ON "IncidentResolutions"."NRWUserID" = "Mobiles"."UserID"
                WHERE "IncidentResolutions"."ReportsID" = '${id}' ORDER BY "IncidentResolutions"."ResolvedDate" DESC
                `
            );

            resolve(data);
        } catch (error) {
            reject({ error: "Retrieve failed" });
        }
    });
};

exports.updateIncidentResolutionById = (IncidentResolutionData, id) => {
    return new Promise((resolve, reject) => {
        IncidentResolution.update(IncidentResolutionData, {
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

exports.deleteIncidentResolutionById = (id) => {
    return new Promise((resolve, reject) => {
        IncidentResolution.destroy({
            where: {
                ID: id,
            },
        }).then(
            (result) => {
                if (result == 0) {
                    reject({ status: 404, error: "IncidentResolution not found" });
                }
                resolve({ success: "Deleted successfully" });
            },
            (err) => {
                reject({ error: "Delete failed" });
            }
        );
    });
};

exports.findAllIncidentResolutions = () => {
    return new Promise((resolve, reject) => {
        IncidentResolution.findAll().then(
            (result) => {
                resolve(result);
            },
            (err) => {
                reject({ error: "Retrieve failed" });
            }
        );
    });
};