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
const Reports = require("../../models/Reports")(sequelize, Sequelize);

CustomerBilling.sync({ force: false });
exports.createCustomerBilling = (CustomerBillingData) => {
  return new Promise(async (resolve, reject) => {
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

      // Customer meter statistics by month and status
      const [customerMeterStats] = await sequelize.query(
        `
        WITH months AS (
          SELECT generate_series(1, 12) AS month
        ),
        meter_status AS (
          SELECT 
            EXTRACT(MONTH FROM "CreatedAt") as month,
            COUNT(CASE WHEN "Status" = 'Active' THEN 1 END) as active,
            COUNT(CASE WHEN "Status" = 'Abandoned' THEN 1 END) as abandoned,
            COUNT(CASE WHEN "Status" = 'Dormant' THEN 1 END) as dormant,
            COUNT(CASE WHEN "Status" = 'Dilapidated' THEN 1 END) as dilapidated
          FROM "CustomerMeters"
          WHERE EXTRACT(YEAR FROM "CreatedAt") = :year
          GROUP BY EXTRACT(MONTH FROM "CreatedAt")
        )
        SELECT 
          m.month,
          COALESCE(ms.active, 0) as active,
          COALESCE(ms.abandoned, 0) as abandoned,
          COALESCE(ms.dormant, 0) as dormant,
          COALESCE(ms.dilapidated, 0) as dilapidated
        FROM months m
        LEFT JOIN meter_status ms ON m.month = ms.month
        ORDER BY m.month;
      `,
        {
          replacements: { year },
          type: Sequelize.QueryTypes.SELECT,
        }
      );

      // Transform customer meter data into arrays for each status
      const customerMeterData = {
        active: Array(12).fill(0),
        abandoned: Array(12).fill(0),
        dormant: Array(12).fill(0),
        dilapidated: Array(12).fill(0),
      };

      if (Array.isArray(customerMeterStats)) {
        customerMeterStats.forEach((stat) => {
          if (
            stat &&
            typeof stat.month === "number" &&
            stat.month >= 1 &&
            stat.month <= 12
          ) {
            const monthIndex = stat.month - 1;
            customerMeterData.active[monthIndex] = parseInt(stat.active || 0);
            customerMeterData.abandoned[monthIndex] = parseInt(
              stat.abandoned || 0
            );
            customerMeterData.dormant[monthIndex] = parseInt(stat.dormant || 0);
            customerMeterData.dilapidated[monthIndex] = parseInt(
              stat.dilapidated || 0
            );
          }
        });
      }

      // First check the table structure
      const [columns] = await sequelize.query(
        `
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = 'CustomerMeters';
      `,
        {
          type: Sequelize.QueryTypes.SELECT,
          logging: console.log,
        }
      );

      console.log("Available columns:", columns);

      // Check sample data
      const [sampleRow] = await sequelize.query(
        `
        SELECT * FROM "CustomerMeters" LIMIT 1;
      `,
        {
          type: Sequelize.QueryTypes.SELECT,
          logging: console.log,
        }
      );

      console.log("Sample data:", sampleRow);

      // Get meter types statistics with potential alternative column names
      const [meterTypes] = await sequelize.query(
        `
        SELECT 
          COALESCE("MeterTypes", "MeterType", "Meter_Type", "Type") as type,
          COUNT(*)::int as count
        FROM "CustomerMeters"
        WHERE COALESCE("MeterTypes", "MeterType", "Meter_Type", "Type") IS NOT NULL
        GROUP BY COALESCE("MeterTypes", "MeterType", "Meter_Type", "Type")
        ORDER BY count DESC;
      `,
        {
          type: Sequelize.QueryTypes.SELECT,
          logging: console.log,
        }
      );

      console.log("Meter Types Query Result:", meterTypes);

      resolve({
        Month,
        Water,
        ZoneWater,
        ZoneSewer,
        SubZoneWater,
        SubZoneSewer,
        Estimate,
        customerMeterStats: customerMeterData,
        meterTypes: meterTypes || [],
      });
    } catch (error) {
      console.error("Charts Error:", error);
      resolve({
        Month: [],
        Water: [],
        ZoneWater: [],
        ZoneSewer: [],
        SubZoneWater: [],
        SubZoneSewer: [],
        Estimate: [],
        customerMeterStats: {
          active: Array(12).fill(0),
          abandoned: Array(12).fill(0),
          dormant: Array(12).fill(0),
          dilapidated: Array(12).fill(0),
        },
        meterTypes: [],
      });
    }
  });
};

exports.getCharts = (year) => {
  return this.findCharts(year);
};

exports.findStats = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // Total Customers (from CustomerMeters)
      const [totalCustomers] = await sequelize.query(
        `SELECT COUNT(*)::int AS total FROM "CustomerMeters"`
      );

      // Total O&M Incidents (from Reports)
      const [totalIncidents] = await sequelize.query(
        `SELECT COUNT(*)::int AS total FROM "Reports"`
      );

      // Sewered vs Non-Sewered Customers
      const [seweredStats] = await sequelize.query(
        `SELECT 
          COUNT(CASE WHEN "Sewered" = 'true' THEN 1 END)::int AS sewered,
          COUNT(CASE WHEN "Sewered" = 'false' OR "Sewered" IS NULL THEN 1 END)::int AS unsewered
        FROM "CustomerMeters"`
      );

      // NRW Ratio calculation
      const [nrwRatio] = await sequelize.query(
        `SELECT 
          ROUND(
            (("SystemInput" - "BilledConsumption") / NULLIF("SystemInput", 0) * 100)::numeric, 
            2
          ) as ratio
        FROM (
          SELECT 
            COALESCE(SUM("Reading"), 0) as "SystemInput",
            COALESCE(SUM("BilledConsumption"), 0) as "BilledConsumption"
          FROM "ProductionMeterReadings"
          WHERE DATE_TRUNC('month', "ReadingDate") = DATE_TRUNC('month', CURRENT_DATE)
        ) AS CurrentMonth`
      );

      resolve({
        totalCustomers: totalCustomers[0]?.total || 0,
        totalIncidents: totalIncidents[0]?.total || 0,
        seweredStats: {
          sewered: seweredStats[0]?.sewered || 0,
          unsewered: seweredStats[0]?.unsewered || 0,
          total:
            (seweredStats[0]?.sewered || 0) + (seweredStats[0]?.unsewered || 0),
        },
        nrwRatio: nrwRatio[0]?.ratio || 0,
      });
    } catch (error) {
      console.error("Stats Error:", error);
      // Return default values on error
      resolve({
        totalCustomers: 0,
        totalIncidents: 0,
        seweredStats: {
          sewered: 0,
          unsewered: 0,
          total: 0,
        },
        nrwRatio: 0,
      });
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
