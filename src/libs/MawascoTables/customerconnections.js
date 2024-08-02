const { Pool, Client } = require("pg");
const env = require("../../configs/env");

const credentials = {
  user: "postgres",
  host: "localhost",
  database: "MAWASCO",
  password: "5050",
};

const pool = new Pool(credentials);

exports.ConnectionsRoutes = function (app) {
  app.get("/mawasco/customers", async (req, res, next) => {
    const query = `SELECT * FROM "customermeters" ORDER BY "account" ASC`;
    pool.query(query, (err, result) => {
      if (err) {
        return res.status(203).json({ error: "Failed to load data!" });
      } else {
        return res.status(200).json(result.rows);
      }
    });
  });

  app.get("/mawasco/customers/paginatedrow", async (req, res, next) => {
    const query = `SELECT COUNT(*) OVER() AS total FROM "customermeters" ORDER BY "account" ASC`;
    pool.query(query, (err, result) => {
      if (err) {
        return res.status(203).json({ error: "Failed to load data!" });
      } else {
        return res.status(200).json(result);
      }
    });
  });

  app.get("/mawasco/customers/:gid", async (req, res, next) => {
    const query = `SELECT * FROM "customermeters" WHERE "gid" = ${req.params.gid} `;
    pool.query(query, (err, result) => {
      if (err) {
        return res.status(203).json({ error: "Failed to load data!" });
      } else {
        return res.status(200).json(result.rows);
      }
    });
  });

  app.get("/mawasco/customers/search/:Account", async (req, res, next) => {
    const query = `SELECT * FROM "customermeters" WHERE "account"::int = ${req.params.Account} `;
    pool.query(query, (err, result) => {
      if (err) {
        return res.status(203).json({ error: "Failed to load data!" });
      } else {
        return res.status(200).json(result.rows);
      }
    });
  });

  app.get("/mawasco/customers/paginated/:offset", async (req, res, next) => {
    const query = `SELECT * FROM "customermeters" ORDER BY "account" ASC LIMIT 12 OFFSET ${req.params.offset} `;
    pool.query(query, (err, result) => {
      if (err) {
        return res.status(203).json({ error: "Failed to load data!" });
      } else {
        return res.status(200).json(result);
      }
    });
  });
};
