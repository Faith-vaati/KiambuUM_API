const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = require("../../configs/connection");
const SewerMainTrunk = require("../../models/SewerMainTrunk")(
  sequelize,
  Sequelize
);

SewerMainTrunk.sync({ force: false });

function cleanData(obj) {
  for (const key in obj) {
    if (obj[key] === "" || obj[key] === null) {
      delete obj[key];
    }
  }
  return obj;
}

exports.createSewerMainTrunk = (SewerMainTrunkData) => {
  return new Promise(async (resolve, reject) => {
    SewerMainTrunkData = cleanData(SewerMainTrunkData);
    try {
      const coordinates = SewerMainTrunkData.Coordinates;
      SewerMainTrunkData.Coordinates = null;
      const result = await SewerMainTrunk.create(SewerMainTrunkData);
      const id = result.dataValues.ID;

      if (coordinates?.length > 0) {
        try {
          // Generate the points in the required format
          const points = coordinates
            .map(
              (coord) =>
                `ST_SetSRID(ST_MakePoint(${coord.longitude}, ${coord.latitude}), 4326)`
            )
            .join(",\n    ");
          // Construct the SQL query
          const sqlQuery = `
             WITH geom AS (
                SELECT ST_MakeLine(ARRAY[
                  ${points}
                ])::geometry(LineString, 4326) AS geom
              )
              UPDATE "SewerMainTrunks"
              SET "geom" = geom.geom
              FROM geom
              WHERE "ID" = '${id}';
            `;
          const [results, metadata] = await sequelize.query(sqlQuery);
          resolve({
            success: "Created successfully",
          });
        } catch (error) {
          if (
            error instanceof Sequelize.ValidationError ||
            error instanceof Sequelize.UniqueConstraintError
          ) {
            const detailMessages = error.errors.map((err) => err.message);
            reject({
              error:
                detailMessages.length > 0
                  ? detailMessages[0]
                  : "Unexpected error!",
            });
          } else {
            reject({
              error: error.message,
            });
          }
        }
      } else {
        reject({
          error: "Invalid coordinates",
        });
      }
    } catch (error) {
      if (
        error instanceof Sequelize.ValidationError ||
        error instanceof Sequelize.UniqueConstraintError
      ) {
        const detailMessages = error.errors.map((err) => err.message);
        reject({
          error:
            detailMessages.length > 0 ? detailMessages[0] : "Unexpected error!",
        });
      } else {
        reject({
          error: error.message,
        });
      }
    }
  });
};

exports.findSewerMainTrunkById = (id) => {
  return new Promise((resolve, reject) => {
    SewerMainTrunk.findByPk(id).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findSewerMainTrunkByName = (value) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, meta] = await sequelize.query(
        `SELECT * FROM "SewerMainTrunks" WHERE "Name" ILIKE '%${value}%'`
      );
      resolve(data);
    } catch (error) {

      reject({ error: "Retrieve Failed" });
    }
  });
};

exports.updateSewerMainTrunkById = (SewerMainTrunkData, id) => {
  return new Promise((resolve, reject) => {
    SewerMainTrunkData = cleanData(SewerMainTrunkData);
    SewerMainTrunk.update(SewerMainTrunkData, {
      where: {
        ID: id,
      },
    }).then(
      async (result) => {
        try {
          if (
            SewerMainTrunkData.Coordinates &&
            SewerMainTrunkData.Coordinates?.length > 0
          ) {
            const points = SewerMainTrunkData.Coordinates.map(
              (coord) =>
                `ST_SetSRID(ST_MakePoint(${coord.longitude}, ${coord.latitude}), 4326)`
            ).join(",\n    ");
            // Construct the SQL query
            const sqlQuery = `
             WITH geom AS (
                SELECT ST_MakeLine(ARRAY[
                  ${points}
                ])::geometry(LineString, 4326) AS geom
              )
              UPDATE "SewerMainTrunks"
              SET "geom" = geom.geom
              FROM geom
              WHERE "ID" = '${id}';
            `;
            const [results, metadata] = await sequelize.query(sqlQuery);
          }
        } catch (error) {}
        resolve({
          success: "Updated successfully",
        });
      },
      (err) => {
        reject({ error: "Update failed" });
      }
    );
  });
};

exports.deleteSewerMainTrunkById = (id) => {
  return new Promise((resolve, reject) => {
    SewerMainTrunk.destroy({
      where: {
        ID: id,
      },
    }).then(
      (result) => {
        if (result != 0) resolve({ success: "Deleted successfully!!!" });
        else reject({ error: "SewerMainTrunk does not exist!!!" });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findAllSewerMainTrunk = () => {
  return new Promise((resolve, reject) => {
    SewerMainTrunk.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findSewerMainTrunkPagnited = (offset) => {
  return new Promise((resolve, reject) => {
    SewerMainTrunk.findAll({
      offset: offset,
      limit: 10,
      order: [["updatedAt", "DESC"]],
    }).then(
      async (result) => {
        const count = await SewerMainTrunk.count();
        resolve({ data: result, total: count });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.totalMapped = (offset) => {
  return new Promise((resolve, reject) => {
    SewerMainTrunk.findAll({}).then(
      async (result) => {
        const count = await SewerMainTrunk.count();
        resolve({
          success: count,
        });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.getGeoJSON = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const SewerMainTrunk = await sequelize.query(
        `SELECT *,ST_MakePoint("Longitude","Latitude") AS point FROM public."SewerMainTrunk"`,
        { type: QueryTypes.SELECT }
      );
      resolve(SewerMainTrunk);
    } catch (error) {
      reject({ error: "Retrieve failed" });
    }
  });
};
