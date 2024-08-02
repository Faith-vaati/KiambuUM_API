const { Pool, Client } = require("pg");
const env = require("../../configs/env");

const credentials = {
  user: "postgres",
  host: "localhost",
  database: "MAWASCO",
  password: "5050",
};

const pool = new Pool(credentials);

exports.MawascoMasterMetersRoutes = function (app) {
  app.get("/mawasco/mastermeters", async (req, res, next) => {
    const query = `SELECT * FROM "mastermeters"`;
    pool.query(query, (err, result) => {
      if (err) {
        return res.status(203).json({ error: "Failed to load data!" });
      } else {
        return res.status(200).json(result.rows);
      }
    });
  });

  app.get("/mawasco/mastermeters/paginatedrow", async (req, res, next) => {
    const query = `SELECT COUNT(*) AS total FROM "mastermeters"`;
    pool.query(query, (err, result) => {
      if (err) {
        return res.status(203).json({ error: "Failed to load data!" });
      } else {
        return res.status(200).json(result);
      }
    });
  });

  app.get("/mawasco/mastermeters/:objectid", async (req, res, next) => {
    const query = `SELECT * FROM "mastermeters" WHERE "objectid" = ${req.params.objectid} `;
    pool.query(query, (err, result) => {
      if (err) {
        return res.status(203).json({ error: "Failed to load data!" });
      } else {
        return res.status(200).json(result.rows);
      }
    });
  });

  app.get("/mawasco/mastermeters/paginated/:offset", async (req, res, next) => {
    const query = `SELECT * FROM "mastermeters" LIMIT 12 OFFSET ${req.params.offset} `;
    pool.query(query, (err, result) => {
      if (err) {
        return res.status(203).json({ error: "Failed to load data!" });
      } else {
        return res.status(200).json(result);
      }
    });
  });
};
