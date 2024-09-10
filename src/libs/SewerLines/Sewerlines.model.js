const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = require("../../configs/connection");
const Sewerlines = require("../../models/Sewerlines")(sequelize, Sequelize);

Sewerlines.sync({ force: false });

function cleanData(obj) {
  for (const key in obj) {
    if (obj[key] === "" || obj[key] === null) {
      delete obj[key];
    }
  }
  return obj;
}

exports.createSewerline = (SewerlinesData) => {
  return new Promise(async (resolve, reject) => {
    SewerlinesData = cleanData(SewerlinesData);
    try {
      const coordinates = SewerlinesData.Coordinates;
      SewerlinesData.Coordinates = null;
      const result = await Sewerlines.create(SewerlinesData);
      const id = result.dataValues.ID;

      if (coordinates.length > 0) {
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
              UPDATE "SewerLines"
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

exports.findSewerlineById = (id) => {
  return new Promise((resolve, reject) => {
    Sewerlines.findByPk(id).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findSewerlineByName = (value) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, meta] = await sequelize.query(
        `SELECT * FROM "SewerLines" WHERE "Name" ILIKE '%${value}%'`
      );
      resolve(data);
    } catch (error) {

      reject({ error: "Retrieve Failed" });
    }
  });
};

exports.updateSewerlineById = (SewerlinesData, id) => {
  return new Promise((resolve, reject) => {
    SewerlinesData = cleanData(SewerlinesData);
    Sewerlines.update(SewerlinesData, {
      where: {
        ID: id,
      },
    }).then(
      async (result) => {
        try {
          if (
            SewerlinesData.Coordinates &&
            SewerlinesData.Coordinates.length > 0
          ) {
            const points = SewerlinesData.Coordinates.map(
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
              UPDATE "SewerLines"
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

exports.deleteSewerlineById = (id) => {
  return new Promise((resolve, reject) => {
    Sewerlines.destroy({
      where: {
        ID: id,
      },
    }).then(
      (result) => {
        if (result != 0) resolve({ success: "Deleted successfully!!!" });
        else reject({ error: "Sewerline does not exist!!!" });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findAllSewerlines = () => {
  return new Promise((resolve, reject) => {
    Sewerlines.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findSewerlinesPagnited = (offset) => {
  return new Promise((resolve, reject) => {
    Sewerlines.findAll({
      offset: offset,
      limit: 10,
      order: [["updatedAt", "DESC"]],
    }).then(
      async (result) => {
        const count = await Sewerlines.count();
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
    Sewerlines.findAll({}).then(
      async (result) => {
        const count = await Sewerlines.count();
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
      const Sewerlines = await sequelize.query(
        `SELECT *,ST_MakePoint("Longitude","Latitude") AS point FROM public."Sewerlines"`,
        { type: QueryTypes.SELECT }
      );
      resolve(Sewerlines);
    } catch (error) {
      reject({ error: "Retrieve failed" });
    }
  });
};
