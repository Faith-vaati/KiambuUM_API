const { Pool, Client } = require("pg");
const env = require("../../configs/env");

const credentials = {
  user: "postgres",
  host: "localhost",
  database: "MAWASCO",
  password: "5050",
};

const pool = new Pool(credentials);

exports.MawascoTanksRoutes = function (app) {
  app.get("/mawasco/tanks", async (req, res, next) => {
    const query = `SELECT * FROM "tanks"`;
    pool.query(query, (err, result) => {
      if (err) {
        return res.status(203).json({ error: "Failed to load data!" });
      } else {
        return res.status(200).json(result.rows);
      }
    });
  });

  app.get("/mawasco/tanks/paginatedrow", async (req, res, next) => {
    const query = `SELECT COUNT(*) AS total FROM "tanks"`;
    pool.query(query, (err, result) => {
      if (err) {
        return res.status(203).json({ error: "Failed to load data!" });
      } else {
        return res.status(200).json(result);
      }
    });
  });

  app.get("/mawasco/tanks/:objectid", async (req, res, next) => {
    const query = `SELECT * FROM "tanks" WHERE "objectid"::int = ${req.params.objectid} `;
    pool.query(query, (err, result) => {
      if (err) {
        return res.status(203).json({ error: "Failed to load data!" });
      } else {
        return res.status(200).json(result.rows);
      }
    });
  });

  app.get("/mawasco/tanks/paginated/:offset", async (req, res, next) => {
    const query = `SELECT * FROM "tanks"  LIMIT 12 OFFSET ${req.params.offset} `;
    pool.query(query, (err, result) => {
      if (err) {
        return res.status(203).json({ error: "Failed to load data!" });
      } else {
        return res.status(200).json(result);
      }
    });
  });

  app.get("/mawasco/tanks/:objectid", async (req, res, next) => {
    const query = `SELECT * FROM "tanks" WHERE "objectid" = ${req.params.objectid} `;
    pool.query(query, (err, result) => {
      if (err) {
        return res.status(203).json({ error: "Failed to load data!" });
      } else {
        return res.status(200).json(result.rows);
      }
    });
  });
};
