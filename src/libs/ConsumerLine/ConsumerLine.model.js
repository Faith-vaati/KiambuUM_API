const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = require("../../configs/connection");
const ConsumerLine = require("../../models/ConsumerLine")(sequelize, Sequelize);

ConsumerLine.sync({ force: false });

function cleanData(obj) {
  for (const key in obj) {
    if (obj[key] === "" || obj[key] === null) {
      delete obj[key];
    }
  }
  return obj;
}

exports.createConsumerLine = (ConsumerLineData) => {
  return new Promise(async (resolve, reject) => {
    ConsumerLineData = cleanData(ConsumerLineData);
    try {
      const coordinates = ConsumerLineData.Coordinates;
      ConsumerLineData.Coordinates = null;
      const result = await ConsumerLine.create(ConsumerLineData);
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
              UPDATE "ConsumerLines"
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

exports.findConsumerLineById = (id) => {
  return new Promise((resolve, reject) => {
    ConsumerLine.findByPk(id).then(
      (result) => {
        if (result == null) {
          reject({ error: "ConsumerLine not found" });
        }

        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findConsumerLineByName = (value) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, meta] = await sequelize.query(
        `SELECT * FROM "ConsumerLine" WHERE "Name" ILIKE '%${value}%'`
      );
      resolve(data);
    } catch (error) {
      reject({ error: "Retrieve Failed" });
    }
  });
};

exports.updateConsumerLineById = (ConsumerLineData, id) => {
  return new Promise((resolve, reject) => {
    ConsumerLineData = cleanData(ConsumerLineData);
    ConsumerLine.update(ConsumerLineData, {
      where: {
        ID: id,
      },
    }).then(
      async (result) => {
        if (
          ConsumerLineData.Coordinates &&
          ConsumerLineData.Coordinates.length > 0
        ) {
          try {
            // Generate the points in the required format
            const points = ConsumerLineData.Coordinates.map(
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
              UPDATE "ConsumerLine"
              SET "geom" = geom.geom
              FROM geom
              WHERE "ID" = '${id}';
            `;
            const [results, metadata] = await sequelize.query(sqlQuery);
          } catch (error) {}
        }
        resolve({
          success: "Updated successfully",
        });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.deleteConsumerLineById = (id) => {
  return new Promise((resolve, reject) => {
    ConsumerLine.destroy({
      where: {
        ID: id,
      },
    }).then(
      (result) => {
        if (result != 0) resolve({ error: "Deleted successfully!!!" });
        else reject({ error: "ConsumerLine does not exist!!!" });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findAllConsumerLines = () => {
  return new Promise((resolve, reject) => {
    ConsumerLine.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findConsumerLinesPaginated = (offset) => {
  return new Promise((resolve, reject) => {
    ConsumerLine.findAll({
      offset: offset,
      limit: 10,
      order: [["updatedAt", "DESC"]],
    }).then(
      async (result) => {
        const count = await ConsumerLine.count();
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
    ConsumerLine.findAll({}).then(
      async (result) => {
        const count = await ConsumerLine.count();
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
      const ConsumerLine = await sequelize.query(
        `SELECT *,ST_MakePoint("Longitude","Latitude") AS point FROM public."ConsumerLine"`,
        { type: QueryTypes.SELECT }
      );
      resolve(ConsumerLine);
    } catch (error) {
      reject({ error: "Retrieve failed" });
    }
  });
};
