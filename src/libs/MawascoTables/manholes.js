const { Pool, Client } = require("pg");
const env = require("../../configs/env");

const credentials = {
  user: "postgres",
  host: "localhost",
  database: "MAWASCO",
  password: "5050",
};

const pool = new Pool(credentials);

exports.MawascoManholesRoutes = function (app) {
  app.get("/mawasco/manholes", async (req, res, next) => {
    const query = `SELECT * FROM "newmanholes"`;
    pool.query(query, (err, result) => {
      if (err) {
        return res.status(203).json({ error: "Failed to load data!" });
      } else {
        return res.status(200).json(result.rows);
      }
    });
  });

  app.get("/mawasco/manholes/paginatedrow", async (req, res, next) => {
    const query = `SELECT COUNT(*) AS total FROM "newmanholes"`;
    pool.query(query, (err, result) => {
      if (err) {
        return res.status(203).json({ error: "Failed to load data!" });
      } else {
        return res.status(200).json(result.rows);
      }
    });
  });

  app.get("/mawasco/manholes/:ID", async (req, res, next) => {
    const query = `SELECT * FROM "newmanholes" WHERE "ID" = '${req.params.ID}'`;
    pool.query(query, (err, result) => {
      if (err) {
        return res.status(203).json({ error: "Failed to load data!" });
      } else {
        return res.status(200).json(result.rows);
      }
    });
  });

  app.get("/mawasco/manholes/paginated/:offset", async (req, res, next) => {
    const query = `SELECT * FROM "newmanholes"  LIMIT 12 OFFSET ${req.params.offset} `;
    pool.query(query, (err, result) => {
      if (err) {
        return res.status(203).json({ error: "Failed to load data!" });
      } else {
        return res.status(200).json(result);
      }
    });
  });
};
