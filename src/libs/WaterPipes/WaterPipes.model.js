const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = require("../../configs/connection");
const WaterPipes = require("../../models/WaterPipes")(sequelize, Sequelize);

WaterPipes.sync({ force: false });

function cleanData(obj) {
  for (const key in obj) {
    if (obj[key] === "" || obj[key] === null) {
      delete obj[key];
    }
  }
  return obj;
}

exports.createWaterPipe = (WaterPipesData) => {
  WaterPipesData = cleanData(WaterPipesData);
  console.log(WaterPipesData);

  return new Promise(async (resolve, reject) => {
    try {
      const coordinates = WaterPipesData.Coordinates;
      WaterPipesData.Coordinates = null;
      const result = await WaterPipes.create(WaterPipesData);
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
              UPDATE "WaterPipes"
              SET "geom" = geom.geom
              FROM geom
              WHERE "ID" = '${id}';
            `;
          const [results, metadata] = await sequelize.query(sqlQuery);
          resolve({
            success: "Created successfully",
          });
        } catch (error) {
          reject({
            error: error.message,
          });
        }
      } else {
        reject({
          error: "Invalid coordinates",
        });
      }
    } catch (error) {
      if (error instanceof Sequelize.UniqueConstraintError) {
        const detailMessage = error.errors[0].message;
       reject({ error: detailMessage });
      } else {
        reject({ error: "An unexpected error occurred" });
      }
    }
  });
};

exports.findWaterPipeById = (id) => {
  return new Promise((resolve, reject) => {
    WaterPipes.findByPk(id).then(
      (result) => {
        if (result == null) {
          reject({ error: "WaterPipe not found" });
        }

        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findWaterPipeByObjectId = (id) => {
  return new Promise((resolve, reject) => {
    WaterPipes.findAll({
      where: {
        ObjectID: id,
      },
    }).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.updateWaterPipeById = (WaterPipesData, id) => {
  return new Promise((resolve, reject) => {
    WaterPipes.update(WaterPipesData, {
      where: {
        ObjectID: id,
      },
    }).then(
      async (result) => {
        const coordinates = await WaterPipes.findAll({
          where: {
            ObjectID: id,
          },
        });
        let q = `LINESTRING(`;
        coordinates[0]?.Coordinates?.map((item) => {
          q = q + `${item[0]} ${item[1]}, `;
        });

        q = q.trim().slice(0, -1);
        q = q + ")";

        const [results, metadata] = await sequelize.query(
          `WITH geom AS (
              SELECT ST_MakeLine(ST_GeomFromText('${q}',4326)) AS geom
            )
          UPDATE "WaterPipes" SET "geom" = geom.geom FROM geom WHERE "ObjectID" = '${id}'`
        );
        resolve({
          success: "Updated successfully",
          coordinates: coordinates.length > 0 ? coordinates[0].Coordinates : [],
        });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.deleteWaterPipeById = (id) => {
  return new Promise((resolve, reject) => {
    WaterPipes.destroy({
      where: {
        ID: id,
      },
    }).then(
      (result) => {
        if (result != 0) resolve({ error: "Deleted successfully!!!" });
        else reject({ error: "WaterPipe does not exist!!!" });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findAllWaterPipes = () => {
  return new Promise((resolve, reject) => {
    WaterPipes.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findWaterPipesPagnited = (offset) => {
  return new Promise((resolve, reject) => {
    WaterPipes.findAll({
      offset: offset,
      limit: 10,
      order: [["updatedAt", "DESC"]],
    }).then(
      async (result) => {
        const count = await WaterPipes.count();
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
    WaterPipes.findAll({}).then(
      async (result) => {
        const count = await WaterPipes.count();
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
      const WaterPipes = await sequelize.query(
        `SELECT *,ST_MakePoint("Longitude","Latitude") AS point FROM public."WaterPipes"`,
        { type: QueryTypes.SELECT }
      );
      resolve(WaterPipes);
    } catch (error) {
      reject({ error: "Retrieve failed" });
    }
  });
};
