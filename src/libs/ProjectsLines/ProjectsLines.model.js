const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = require("../../configs/connection");
const ProjectsLines = require("../../models/ProjectsLines")(
  sequelize,
  Sequelize
);

ProjectsLines.sync({ force: false });

exports.createProjectLines = (ProjectsLinesData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const coordinates = ProjectsLinesData.Coordinates;
      ProjectsLinesData.Coordinates = null;

      const result = await ProjectsLines.create(ProjectsLinesData);
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
              ]) AS geom
            )
            UPDATE "ProjectsLines"
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
      reject({ error: "ProjectsLines creation failed" ?? err.message });
    }
  });
};

exports.findProjectsLineById = (id) => {
  return new Promise((resolve, reject) => {
    ProjectsLines.findByPk(id).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findProjectsLineByObjectId = (id) => {
  return new Promise((resolve, reject) => {
    ProjectsLines.findAll({
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

exports.updateProjectsLineById = (ProjectsLinesData, id) => {
  return new Promise((resolve, reject) => {
    ProjectsLines.update(ProjectsLinesData, {
      where: {
        ObjectID: id,
      },
    }).then(
      async (result) => {
        const coordinates = await ProjectsLines.findAll({
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
          UPDATE "ProjectsLines" SET "geom" = geom.geom FROM geom WHERE "ObjectID" = '${id}'`
        );

        resolve({
          success: "Updated successfully",
          coordinates: coordinates.length > 0 ? coordinates[0].Coordinates : [],
        });
      },
      (err) => {
        reject({ error: "Update failed" });
      }
    );
  });
};

exports.deleteProjectsLineById = (id) => {
  return new Promise((resolve, reject) => {
    ProjectsLines.destroy({
      where: {
        ID: id,
      },
    }).then(
      (result) => {
        if (result != 0) resolve({ success: "Deleted successfully!!!" });
        else reject({ error: "ProjectsLine does not exist!!!" });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findAllProjectsLines = () => {
  return new Promise((resolve, reject) => {
    ProjectsLines.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findProjectsLinesPagnited = (offset) => {
  return new Promise((resolve, reject) => {
    ProjectsLines.findAll({
      offset: offset,
      limit: 10,
      order: [["updatedAt", "DESC"]],
    }).then(
      async (result) => {
        const count = await ProjectsLines.count();
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
    ProjectsLines.findAll({}).then(
      async (result) => {
        const count = await ProjectsLines.count();
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
      const ProjectsLines = await sequelize.query(
        `SELECT *,ST_MakePoint("Longitude","Latitude") AS point FROM public."ProjectsLines"`,
        { type: QueryTypes.SELECT }
      );
      resolve(ProjectsLines);
    } catch (error) {
      reject({ error: "Retrieve failed" });
    }
  });
};
