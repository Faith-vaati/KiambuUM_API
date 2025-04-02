const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const CustomerBilling = require("../../models/CustomerBilling")(
  sequelize,
  Sequelize
);
const CustomerMeters = require("../../models/CustomerMeters")(
  sequelize,
  Sequelize
);

CustomerBilling.sync({ force: false });
exports.createCustomerBilling = (CustomerBillingData) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Ensure numeric fields are not NULL or invalid
      const amount =
        CustomerBillingData.Amount != null
          ? parseFloat(CustomerBillingData.Amount)
          : 0;
      const balance =
        CustomerBillingData.CurrentBalance != null
          ? parseFloat(CustomerBillingData.CurrentBalance)
          : 0;
      const previousBalance =
        CustomerBillingData.PreviousBalance != null
          ? parseFloat(CustomerBillingData.PreviousBalance)
          : 0;

      if (CustomerBillingData?.account === undefined) {
        return reject({ message: "Body is required!!!" });
      }
      CustomerBilling.create(CustomerBillingData).then(
        (result) => {
          resolve({ success: "CustomerBilling Created Successfully" });
        },
        (err) => {
          reject({ error: "Creation failed" });
        }
      );
    } catch (error) {
      reject({ error: "Failed to create customer billing" });
    }
  });
};

exports.findCustomerBillingById = (id) => {
  return new Promise((resolve, reject) => {
    CustomerBilling.findByPk(id).then(
      (result) => {
        if (result == null) {
          reject({ error: "Customer not found" });
        }
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.updateCustomerBillingById = (CustomerBillingData, id) => {
  return new Promise((resolve, reject) => {
    CustomerBilling.update(CustomerBillingData, {
      where: {
        ID: id,
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

exports.deleteCustomerBillingById = (ID) => {
  return new Promise((resolve, reject) => {
    CustomerBilling.destroy({
      where: {
        ID: ID,
      },
    }).then(
      (result) => {
        if (result != 0) resolve({ success: "Deleted successfully!!!" });
        else reject({ error: "Customer does not exist!!!" });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findAllCustomerBilling = () => {
  return new Promise((resolve, reject) => {
    CustomerBilling.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findCustomerBillingPaginated = (offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, metadata] = await sequelize.query(
        `SELECT * FROM "CustomerBillings" ORDER BY "DueDate" DESC LIMIT 12 OFFSET ${offset}`
      );

      const [count, tl] = await sequelize.query(
        `SELECT Count(*)::int AS total FROM "CustomerBillings"`
      );
      resolve({
        data: data,
        total: count[0].total,
      });
    } catch (error) {
      reject({ error: "Retrieve Failed" });
    }
  });
};

exports.findMapData = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { year, month } = req.query;

      let whereClause = "";
      if (year) {
        whereClause += `EXTRACT(YEAR FROM cb."Period") = ${year}`;
      }
      if (month) {
        if (whereClause) whereClause += " AND ";
        whereClause += `EXTRACT(MONTH FROM cb."Period") = ${month}`;
      }

      const query = `
        SELECT cb.*, cm."Latitude", cm."Longitude"
        FROM "CustomerBillings" cb
        LEFT JOIN "CustomerMeters" cm 
        ON cb."Acc_No"::text = cm."AccountNo"::text 
        OR cb."OldAcc"::text = cm."AccountNo"::text
        ${whereClause ? `WHERE ${whereClause}` : ""}
      `;

      const [results] = await sequelize.query(query);

      const geojson = {
        type: "FeatureCollection",
        features: results.map((billing) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              parseFloat(billing.Longitude),
              parseFloat(billing.Latitude),
            ],
          },
          properties: billing,
        })),
      };

      resolve(geojson);
    } catch (error) {
      console.error("Error fetching geojson data:", error);
      reject({ error: "Failed to retrieve geojson data." });
    }
  });
};

exports.findManagementData = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { offset = 0, search = "", year, month } = req.query;

      let whereClause = {};

      if (year && month) {
        // Calculate the last day of the given month
        const lastDay = getLastDayOfMonth(year, month);

        // Filter by specific year and month
        whereClause.Period = {
          [Op.between]: [
            `${year}-${String(month).padStart(2, "0")}-01`,
            `${year}-${String(month).padStart(2, "0")}-${String(
              lastDay
            ).padStart(2, "0")}`,
          ],
        };
      } else if (year) {
        // Filter by specific year only
        whereClause.Period = {
          [Op.between]: [`${year}-01-01`, `${year}-12-31`],
        };
      }

      if (search) {
        whereClause = {
          ...whereClause,
          [Op.or]: [
            { Name: { [Op.iLike]: `%${search}%` } },
            { OldAcc: { [Op.iLike]: `%${search}%` } },
            { Acc_No: { [Op.iLike]: `%${search}%` } },
            { Bill_No: { [Op.iLike]: `%${search}%` } },
            {
              [Op.and]: Sequelize.literal(`"Period"::TEXT LIKE '%${search}%'`),
            },
            { Due_Date: { [Op.iLike]: `%${search}%` } },
          ],
        };
      }

      const data = await CustomerBilling.findAndCountAll({
        where: whereClause,
        limit: 12,
        offset: parseInt(offset, 10),
        order: [["Period", "DESC"]],
      });

      resolve({
        data: data.rows,
        total: data.count,
      });
    } catch (error) {
      console.error("Error fetching customer billing data:", error);
      reject({ error: "Failed to retrieve customer billing data." });
    }
  });
};

const getLastDayOfMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

exports.findCustomersPagnitedSearch = (value, column, offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT * FROM "CustomerBillings" WHERE "${column}" ILIKE '%${value}%' LIMIT 12 OFFSET ${offset}`
      );
      const [count, tl] = await sequelize.query(
        `SELECT Count(*)::int AS total FROM "CustomerBillings" WHERE "${column}" ILIKE '%${value}%' LIMIT 12 OFFSET ${offset}`
      );

      resolve({
        data: result,
        total: count[0].total,
      });
    } catch (error) {
      reject({ error: "Retrieve failed!" });
    }
  });
};

exports.filterBilling = (column, operator, value, offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT * FROM "CustomerBillings" WHERE "${column}" ${operator} '${value}' LIMIT 12 OFFSET ${offset}`
      );

      const [count, cmetadata] = await sequelize.query(
        `SELECT Count(*)::int AS total FROM "CustomerBillings" WHERE "${column}" ${operator} '${value}'`
      );

      resolve({
        data: result,
        total: count[0].total,
      });
    } catch (error) {
      reject({ error: "Retrieve failed!" });
    }
  });
};

exports.findCharts = (year) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [Month, mndmeta] = await sequelize.query(
        `SELECT
            to_char("Period", 'Mon') AS month,
            SUM("m_Total")::float AS "TotalAmount",
            SUM("Arrears")::float AS "TotalArrears"
        FROM
            "CustomerBillings"
        WHERE
            EXTRACT(YEAR FROM "Period") = ${year}
        GROUP BY
            to_char("Period", 'Mon'),
            EXTRACT(MONTH FROM "Period")
        ORDER BY
            EXTRACT(MONTH FROM "Period");
        `
      );
      const [Water, wrmeta] = await sequelize.query(
        `SELECT
            to_char("Period", 'Mon') AS month,
            SUM("Water")::float AS "Water",
            SUM("Sewer")::float AS "Sewer"
        FROM
            "CustomerBillings"
        WHERE
            EXTRACT(YEAR FROM "Period") = ${year}
        GROUP BY
            to_char("Period", 'Mon'),
            EXTRACT(MONTH FROM "Period")
        ORDER BY
            EXTRACT(MONTH FROM "Period");
        `
      );
      const [ZoneWater, zwrmeta] = await sequelize.query(
        `SELECT
          "Zone" AS name,
          SUM("Water")::float AS "Water"
      FROM
          "CustomerBillings"
      WHERE
          EXTRACT(YEAR FROM "Period") = ${year}
      GROUP BY "Zone"
      ORDER BY "Zone"::int ASC; 
      `
      );
      const [ZoneSewer, swrmeta] = await sequelize.query(
        `SELECT
          "Zone" AS name,
          SUM("Sewer")::float AS "Sewer"
      FROM
          "CustomerBillings"
      WHERE
          EXTRACT(YEAR FROM "Period") = ${year}
      GROUP BY "Zone"
      ORDER BY "Zone"::int ASC; 
      `
      );

      const [SubZoneWater, szwrmeta] = await sequelize.query(
        `SELECT
          "Sub_Zone" AS name,
          SUM("Water")::float AS "Water"
      FROM
          "CustomerBillings"
      WHERE
          EXTRACT(YEAR FROM "Period") = ${year}
      GROUP BY "Sub_Zone"
      ORDER BY "Sub_Zone" ASC; 
      `
      );
      const [SubZoneSewer, sswrmeta] = await sequelize.query(
        `SELECT
          "Sub_Zone" AS name,
          SUM("Sewer")::float AS "Sewer"
      FROM
          "CustomerBillings"
      WHERE
          EXTRACT(YEAR FROM "Period") = ${year}
      GROUP BY "Sub_Zone"
      ORDER BY "Sub_Zone" ASC; 
      `
      );
      const [Estimate, ewrmeta] = await sequelize.query(
        `SELECT
          "Est" AS label,
          SUM("m_Total")::float AS value
      FROM
          "CustomerBillings"
      WHERE
          EXTRACT(YEAR FROM "Period") = ${year}
      GROUP BY "Est"
      ORDER BY "Est" ASC; 
      `
      );

      resolve({
        Month,
        Water,
        ZoneWater,
        ZoneSewer,
        SubZoneWater,
        SubZoneSewer,
        Estimate,
      });
    } catch (error) {
      reject(null);
    }
  });
};

exports.findStats = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [Total, metadata] = await sequelize.query(
        `SELECT Sum("m_Total")::float AS total FROM "CustomerBillings"`
      );
      const [Sewer, swmetadata] = await sequelize.query(
        `SELECT Sum("Sewer")::float AS total FROM "CustomerBillings"`
      );
      const [Water, wrmeta] = await sequelize.query(
        `SELECT Sum("Water")::float AS total FROM "CustomerBillings"`
      );
      const [Customers, csmeta] = await sequelize.query(
        `SELECT Count(DISTINCT "Acc_No")::float AS total FROM "CustomerBillings"`
      );
      const [Arrears, armeta] = await sequelize.query(
        `SELECT SUM(cb."Arrears")::float AS total
            FROM "CustomerBillings" cb
            INNER JOIN (
                SELECT "Acc_No", MAX("Period") AS latest_period
                FROM "CustomerBillings"
                GROUP BY "Acc_No"
            ) latest_cb
            ON cb."Acc_No" = latest_cb."Acc_No" AND cb."Period" = latest_cb."latest_period";
            `
      );

      resolve({
        Total: Total[0].total,
        Sewer: Sewer[0].total,
        Water: Water[0].total,
        Customers: Customers[0].total,
        Arrears: Arrears[0].total,
      });
    } catch (error) {
      reject({ error: "Retrieve failed!" });
    }
  });
};

exports.findCustomerBilling = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [results, metadata] = await sequelize.query(
        `SELECT jsonb_agg(to_jsonb(q)  - 'ID' - 'geom' - 'Remarks' - 'createdAt' - 'updatedAt') 
        FROM (SELECT "CustomerBillings".*,"CustomerMeters".*
                 FROM "CustomerMeters" INNER JOIN "CustomerBillings" 
            ON "CustomerMeters"."AccountNo" = "CustomerBillings"."account") q`
      );
      resolve(results[0].jsonb_agg);
    } catch (error) {
      reject({ error: "Retrieve failed!" });
    }
  });
};

exports.findCustomerBillingfilter = (table, column, operator, value) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [results, metadata] = await sequelize.query(
        `SELECT jsonb_agg(to_jsonb(q)  - 'ID' - 'geom' - 'Remarks' - 'createdAt' - 'updatedAt') 
        FROM (SELECT "CustomerBillings".*,"CustomerMeters".*
                 FROM "CustomerMeters" INNER JOIN "CustomerBillings" 
            ON "CustomerMeters"."AccountNo" = "CustomerBillings"."account" 
            WHERE "${table}"."${column}" ${operator} ${
          operator === "ILIKE" ? `'%${value}%'` : `'${value}'`
        }) q`
      );
      resolve(results[0].jsonb_agg);
    } catch (error) {
      reject({ error: "Retrieve failed!" });
    }
  });
};
