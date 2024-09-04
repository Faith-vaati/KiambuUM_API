const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = require("../../configs/connection");
const SewerMainTrunk = require("../../models/SewerMainTrunk")(
  sequelize,
  Sequelize
);

SewerMainTrunk.sync({ force: false });

exports.createSewerMainTrunk = (SewerMainTrunkData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const coordinates = SewerMainTrunkData.Coordinates;
      SewerMainTrunkData.Coordinates = null;
      const result = await SewerMainTrunk.create(SewerMainTrunkData);
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
              SELECT ST_Multi(ST_MakeLine(ARRAY[
                ${points}
              ])) AS geom
            )
            UPDATE "SewerMainTrunk"
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
    } catch (err) {
      console.log(err);
      reject({ error: "SewerMainTrunk creation failed" ?? err.message });
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
      console.log(error);

      reject({ error: "Retrieve Failed" });
    }
  });
};

exports.updateSewerMainTrunkById = (SewerMainTrunkData, id) => {
  return new Promise((resolve, reject) => {
    SewerMainTrunk.update(SewerMainTrunkData, {
      where: {
        ID: id,
      },
    }).then(
      async (result) => {
        const coordinates = await SewerMainTrunk.findAll({
          where: {
            ID: id,
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
          UPDATE "SewerMainTrunks" SET "geom" = geom.geom FROM geom WHERE "ID" = '${id}'`
        );

        resolve({
          success: "Updated successfully",
          coordinates: coordinates.length > 0 ? coordinates[0].Coordinates : [],
        });
      },
      (err) => {
        console.log(err);
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
