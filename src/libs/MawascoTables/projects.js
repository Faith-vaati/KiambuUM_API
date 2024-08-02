const { Pool, Client } = require("pg");
const env = require("../../configs/env");

const credentials = {
  user: "postgres",
  host: "localhost",
  database: "MAWASCO",
  password: "5050",
};

const pool = new Pool(credentials);

exports.MawascoProjectsRoutes = function (app) {
  app.get("/mawasco/projects", async (req, res, next) => {
    const query = `SELECT * FROM "Projects"`;
    pool.query(query, (err, result) => {
      if (err) {
        return res.status(203).json({ error: "Failed to load data!" });
      } else {
        return res.status(200).json(result.rows);
      }
    });
  });

  app.get("/mawasco/projects/paginatedrow", async (req, res, next) => {
    const query = `SELECT COUNT(*) AS total FROM "Projects"`;
    pool.query(query, (err, result) => {
      if (err) {
        return res.status(203).json({ error: "Failed to load data!" });
      } else {
        return res.status(200).json(result);
      }
    });
  });

  app.get("/mawasco/projects/:ID", async (req, res, next) => {
    const query = `SELECT * FROM "Projects" WHERE "ID" = '${req.params.ID}'`;
    pool.query(query, (err, result) => {
      if (err) {
        return res.status(203).json({ error: "Failed to load data!" });
      } else {
        return res.status(200).json(result.rows);
      }
    });
  });

  app.get("/mawasco/projects/paginated/:offset", async (req, res, next) => {
    const query = `SELECT * FROM "Projects"  LIMIT 12 OFFSET ${req.params.offset} `;
    pool.query(query, (err, result) => {
      if (err) {
        return res.status(203).json({ error: "Failed to load data!" });
      } else {
        return res.status(200).json(result);
      }
    });
  });
};
