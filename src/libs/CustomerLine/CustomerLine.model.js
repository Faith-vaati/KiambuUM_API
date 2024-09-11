const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = require("../../configs/connection");
const CustomerLine = require("../../models/CustomerLine")(sequelize, Sequelize);

CustomerLine.sync({ force: false });

function cleanData(obj) {
  for (const key in obj) {
    if (obj[key] === "" || obj[key] === null) {
      delete obj[key];
    }
  }
  return obj;
}

exports.createCustomerLine = (CustomerLineData) => {
  return new Promise(async (resolve, reject) => {
    CustomerLineData = cleanData(CustomerLineData);
    try {
      const coordinates = CustomerLineData.Coordinates;
      CustomerLineData.Coordinates = null;
      const result = await CustomerLine.create(CustomerLineData);
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
              UPDATE "CustomerLine"
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

exports.findCustomerLineById = (id) => {
  return new Promise((resolve, reject) => {
    CustomerLine.findByPk(id).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findCustomerLineByName = (value) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, meta] = await sequelize.query(
        `SELECT * FROM "CustomerLine" WHERE "Name" ILIKE '%${value}%'`
      );
      resolve(data);
    } catch (error) {
      reject({ error: "Retrieve Failed" });
    }
  });
};

exports.updateCustomerLineById = (CustomerLineData, id) => {
  return new Promise((resolve, reject) => {
    CustomerLineData = cleanData(CustomerLineData);
    CustomerLine.update(CustomerLineData, {
      where: {
        ID: id,
      },
    }).then(
      async (result) => {
        try {
          if (
            CustomerLineData.Coordinates &&
            CustomerLineData.Coordinates.length > 0
          ) {
            const points = CustomerLineData.Coordinates.map(
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
              UPDATE "CustomerLine"
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

exports.deleteCustomerLineById = (id) => {
  return new Promise((resolve, reject) => {
    CustomerLine.destroy({
      where: {
        ID: id,
      },
    }).then(
      (result) => {
        if (result != 0) resolve({ success: "Deleted successfully!!!" });
        else reject({ error: "CustomerLine does not exist!!!" });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findAllCustomerLines = () => {
  return new Promise((resolve, reject) => {
    CustomerLine.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findCustomerLinesPaginated = (offset) => {
  return new Promise((resolve, reject) => {
    CustomerLine.findAll({
      offset: offset,
      limit: 10,
      order: [["updatedAt", "DESC"]],
    }).then(
      async (result) => {
        const count = await CustomerLine.count();
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
    CustomerLine.findAll({}).then(
      async (result) => {
        const count = await CustomerLine.count();
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
      const CustomerLine = await sequelize.query(
        `SELECT *,ST_MakePoint("Longitude","Latitude") AS point FROM public."CustomerLine"`,
        { type: QueryTypes.SELECT }
      );
      resolve(CustomerLine);
    } catch (error) {
      reject({ error: "Retrieve failed" });
    }
  });
};
