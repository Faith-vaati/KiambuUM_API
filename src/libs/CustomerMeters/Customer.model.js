const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = require("../../configs/connection");
const CustomerMeters = require("../../models/CustomerMeters")(
  sequelize,
  Sequelize
);

CustomerMeters.sync({ force: false });

function cleanData(obj) {
  for (const key in obj) {
    if (obj[key] === "" || obj[key] === null) {
      delete obj[key];
    }
  }
  return obj;
}

exports.createCustomer = (CustomerData) => {
  return new Promise(async (resolve, reject) => {
    CustomerData = cleanData(CustomerData);
    CustomerMeters.findAll({
      where: {
        AccountNo: CustomerData.AccountNo,
      },
    }).then(
      (result) => {
        if (result?.length === 0) {
          CustomerMeters.create(CustomerData).then(
            async (result) => {
              try {
                const id = result.dataValues.ID;
                const [data, dmeta] = await sequelize.query(
                  `UPDATE public."CustomerMeters" SET "geom" = ST_SetSRID(ST_MakePoint("Longitude", "Latitude"), 4326) WHERE "ID" = '${id}';`
                );
                resolve({
                  success: "Customer Created successfully",
                  token: result.dataValues.ID,
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
            },
            (error) => {
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
          );
        } else {
          reject({ error: "This account number exists" });
        }
      },
      (err) => {
        reject({ error: "Customer creation failed" });
      }
    );
  });
};

exports.findCustomerById = (id) => {
  return new Promise((resolve, reject) => {
    CustomerMeters.findByPk(id).then(
      (result) => {
        if (result == null) {
          reject({ status: 404, error: "Customer not found" });
        }
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findCustomerByAccount = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [data, meta] = await sequelize.query(
        `SELECT * FROM "CustomerMeters" WHERE "AccountNo"::text ILIKE '%${id}%'::text LIMIT 2 OFFSET 0`
      );

      resolve(data);
    } catch (error) {
      reject([]);
    }
  });
};

exports.updateCustomerById = (CustomerData, id) => {
  CustomerData = cleanData(CustomerData);
  return new Promise((resolve, reject) => {
    CustomerMeters.update(CustomerData, {
      where: {
        ID: id,
      },
    }).then(
      async (result) => {
        try {
          if (CustomerData.Longitude && CustomerData.Latitude) {
            const [data, dmeta] = await sequelize.query(
              `UPDATE public."CustomerMeters" SET "geom" = ST_SetSRID(ST_MakePoint("Longitude", "Latitude"), 4326) WHERE "ID" = '${id}';`
            );
          }
        } catch (error) {}
        resolve({ success: "Updated successfully", token: id });
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.deleteCustomerById = (id) => {
  return new Promise((resolve, reject) => {
    CustomerMeters.destroy({
      where: {
        ID: id,
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

exports.findAllCustomers = () => {
  return new Promise((resolve, reject) => {
    CustomerMeters.findAll({}).then(
      (result) => {
        resolve(result);
      },
      (err) => {
        reject({ error: "Retrieve failed" });
      }
    );
  });
};

exports.findCustomersPagnited = (offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, meta] = await sequelize.query(
        `SELECT * FROM "CustomerMeters" ORDER BY "createdAt" ASC LIMIT 12 OFFSET ${offset}  `
      );
      const [count, mdata] = await sequelize.query(
        `SELECT COUNT(*) FROM "CustomerMeters"`
      );
      resolve({
        data: result,
        total: count[0].count,
      });
    } catch (error) {
      reject({ error: "Retrieve Failed!" });
    }
  });
};

exports.findCustomersPagnitedSearch = (column, value, offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT * FROM "CustomerMeters" WHERE "${column}" ILIKE '%${value}%' LIMIT 12 OFFSET ${offset}`
      );
      const [count, mdata] = await sequelize.query(
        `SELECT COUNT(*) FROM "CustomerMeters" WHERE "${column}" ILIKE '%${value}%'`
      );
      resolve({
        data: result,
        total: count[0].count,
      });
    } catch (error) {
      reject({ error: "Retrieve failed!" });
    }
  });
};

exports.searchOneCustomer = (value) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT "MeterSerial","AccountNo", "Latitude", "Longitude" FROM "CustomerMeters" WHERE ("AccountNo"::text ILIKE '%${value}%') LIMIT 1 OFFSET 0`
      );
      resolve(result);
    } catch (error) {
      console.log(error);

      reject([]);
    }
  });
};

exports.searchOthers = (table, value) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT "Name", "Latitude", "Longitude" FROM "${table}" WHERE ("Name"::text ILIKE '%${value}%' OR "Name" ILIKE '%${value}%') LIMIT 1 OFFSET 0`
      );
      resolve(result);
    } catch (error) {
      reject([]);
    }
  });
};

exports.filterCustomers = (column, operator, value, offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [result, metadata] = await sequelize.query(
        `SELECT * FROM "CustomerMeters" WHERE "${column}" ${operator} '${value}' LIMIT 12 OFFSET ${offset}`
      );

      const [count, cmetadata] = await sequelize.query(
        `SELECT Count(*)::int AS total FROM "CustomerMeters" WHERE "${column}" ${operator} '${value}'`
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

exports.totalMapped = (offset) => {
  return new Promise((resolve, reject) => {
    CustomerMeters.findAll({}).then(
      async (result) => {
        const count = await CustomerMeters.count();
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
      const users = await sequelize.query(
        `SELECT *,ST_MakePoint("Longitude","Latitude") AS point FROM public."CustomerMeters"`,
        { type: QueryTypes.SELECT }
      );
      resolve(users);
    } catch (error) {
      reject({ error: "Retrieve failed" });
    }
  });
};

exports.getSummaryStats = () => {
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
          COUNT(CASE WHEN "Sewered" = 'Yes' THEN 1 END)::int AS sewered,
          COUNT(CASE WHEN "Sewered" = 'No' OR "Sewered" IS NULL THEN 1 END)::int AS unsewered
        FROM "CustomerMeters"`
      );

      // NRW Ratio calculation
      const [nrwRatio] = await sequelize.query(`
        WITH customer_stats AS (
          SELECT 
            COUNT(*)::int AS total_customers,
            COALESCE(SUM(
              (REPLACE("SecondReading", ' ', '')::numeric - REPLACE("FirstReading", ' ', '')::numeric)
            ), 0)::numeric AS customer_consumption
          FROM "NRWMeterReadings"
          WHERE "deletedAt" IS NULL 
          AND "MeterType" = 'Customer Meter'
          AND "FirstReadingDate"::Date >= CURRENT_DATE - INTERVAL '30 days'
        ),
        master_readings AS (
          SELECT 
            "DMAName",
            (REPLACE("SecondReading", ' ', '')::numeric - REPLACE("FirstReading", ' ', '')::numeric) as consumption
          FROM "NRWMeterReadings"
          WHERE "MeterType" = 'Master Meter'
          AND "FirstReadingDate"::Date >= CURRENT_DATE - INTERVAL '30 days'
          AND "deletedAt" IS NULL
        ),
        master_meter_stats AS (
          SELECT COALESCE(SUM(
            CASE 
              WHEN "MeterType" = 'Master Meter' THEN
                CASE 
                  WHEN "DMAName" = 'Makanja 1' THEN
                    COALESCE((
                      SELECT consumption FROM master_readings WHERE "DMAName" = 'Makanja 1'
                    ), 0) -
                    COALESCE((
                      SELECT consumption FROM master_readings WHERE "DMAName" = 'Makanja 2'
                    ), 0) -
                    COALESCE((
                      SELECT consumption FROM master_readings WHERE "DMAName" = 'Samaki 1'
                    ), 0) -
                    COALESCE((
                      SELECT consumption FROM master_readings WHERE "DMAName" = 'Samaki 2'
                    ), 0)
                  WHEN "DMAName" = 'Samaki 1' THEN
                    COALESCE((
                      SELECT consumption FROM master_readings WHERE "DMAName" = 'Samaki 1'
                    ), 0) -
                    COALESCE((
                      SELECT consumption FROM master_readings WHERE "DMAName" = 'Samaki 2'
                    ), 0)
                  WHEN "DMAName" IN ('Makanja 2', 'Samaki 2') THEN
                    (REPLACE("SecondReading", ' ', '')::numeric - REPLACE("FirstReading", ' ', '')::numeric)
                  ELSE
                    (REPLACE("SecondReading", ' ', '')::numeric - REPLACE("FirstReading", ' ', '')::numeric)
                END
              ELSE 0
            END
          ), 0)::numeric AS master_consumption
          FROM "NRWMeterReadings"
          WHERE "deletedAt" IS NULL 
          AND "FirstReadingDate"::Date >= CURRENT_DATE - INTERVAL '30 days'
        )
        SELECT 
          CASE 
            WHEN ms.master_consumption > 0 THEN
              ROUND(((ms.master_consumption - cs.customer_consumption) / ms.master_consumption * 100)::numeric, 2)
            ELSE 0
          END AS ratio
        FROM customer_stats cs
        CROSS JOIN master_meter_stats ms
      `);

      const result = {
        totalCustomers: totalCustomers[0]?.total || 0,
        totalIncidents: totalIncidents[0]?.total || 0,
        seweredStats: {
          sewered: seweredStats[0]?.sewered || 0,
          unsewered: seweredStats[0]?.unsewered || 0,
          total:
            (seweredStats[0]?.sewered || 0) + (seweredStats[0]?.unsewered || 0),
        },
        nrwRatio: nrwRatio[0]?.ratio || 0,
      };
      resolve(result);
    } catch (error) {
      console.error("Stats Error:", error);
      reject(error); // Changed to reject instead of resolve with defaults
    }
  });
};

exports.getStats = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [Customers, smeta] = await sequelize.query(
        `SELECT Count(*)::FLOAT as total FROM public."CustomerMeters"`
      );
      const [Tanks, fmeta] = await sequelize.query(
        `SELECT Count(*)::FLOAT as total FROM public."Tanks"`
      );
      const [MasterMeters, imeta] = await sequelize.query(
        `SELECT Count(*)::FLOAT as total FROM public."MasterMeters"`
      );
      const [ProductionMeters, pmeta] = await sequelize.query(
        `SELECT Count(*)::FLOAT as total FROM public."ProductionMeters"`
      );
      const [Manholes, cbmeta] = await sequelize.query(
        `SELECT Count(*)::FLOAT as total FROM public."Manholes"`
      );
      const [CustomerChambers, invmeta] = await sequelize.query(
        `SELECT Count(*)::FLOAT as total FROM public."CustomerChambers"`
      );
      const [ConnectionChambers, cmeta] = await sequelize.query(
        `SELECT Count(*)::FLOAT as total FROM public."ConnectionChambers"`
      );
      const [SewerLines, semeta] = await sequelize.query(
        `SELECT Count(*)::FLOAT as total FROM public."SewerLines"`
      );
      resolve({
        Customers: Customers[0].total,
        Tanks: Tanks[0].total,
        MasterMeters: MasterMeters[0].total,
        ProductionMeters: ProductionMeters[0].total,
        Manholes: Manholes[0].total,
        CustomerChambers: CustomerChambers[0].total,
        ConnectionChambers: ConnectionChambers[0].total,
        SewerLines: SewerLines[0].total,
      });
    } catch (error) {
      reject(null);
    }
  });
};

exports.findCharts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [MeterStatus, dmeta] = await sequelize.query(
        `SELECT "Status" AS name,Count(*)::int AS value FROM public."CustomerMeters" GROUP BY "Status"`
      );
      const [Material, ameta] = await sequelize.query(
        `SELECT "Material"  AS name,Count(*)::int  AS value FROM public."CustomerMeters" GROUP BY "Material"`
      );

      const [Size, mtrmeta] = await sequelize.query(
        `SELECT "Size"  AS name,Count(*)::int  AS value FROM public."CustomerMeters" GROUP BY "Size"`
      );

      const [Tanks, dmameta] = await sequelize.query(
        `SELECT "Name"  AS name,Sum("Capacity"::FLOAT)::FLOAT  AS value FROM public."Tanks" GROUP BY "Name"`
      );

      resolve({
        MeterStatus,
        Material,
        Size,
        Tanks,
      });
    } catch (error) {
      console.log(error);

      reject(null);
    }
  });
};

exports.getMeterTypes = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const meterTypes = await sequelize.query(
        `
        SELECT 
          COALESCE("MeterType", 'Unknown') as name,
          COUNT(*)::int as value
        FROM "CustomerMeters"
        GROUP BY "MeterType"
        ORDER BY value DESC
      `,
        {
          type: sequelize.QueryTypes.SELECT,
          raw: true,
        }
      );

      console.log("Meter types query result:", meterTypes);
      resolve(meterTypes); // Should already be an array
    } catch (error) {
      console.error("Meter Types Error:", error);
      reject({
        error: "Failed to retrieve meter types",
        details: error.message,
      });
    }
  });
};

exports.getMeterStatus = (year = new Date().getFullYear()) => {
  return new Promise(async (resolve, reject) => {
    try {
      const meterStatus = await sequelize.query(
        `
        WITH months AS (
          SELECT generate_series(
            make_date($1, 1, 1),
            make_date($1, 12, 31),
            interval '1 month'
          )::date AS month
        )
        SELECT 
          to_char(m.month, 'Mon') as month,
          COALESCE(SUM(CASE WHEN cm."Status" = 'Dilapidated' THEN 1 ELSE 0 END), 0) as "Dilapidated",
          COALESCE(SUM(CASE WHEN cm."Status" = 'Abandoned' THEN 1 ELSE 0 END), 0) as "Abandoned",
          COALESCE(SUM(CASE WHEN cm."Status" = 'Dormant' THEN 1 ELSE 0 END), 0) as "Dormant",
          COALESCE(SUM(CASE WHEN cm."Status" = 'Active' THEN 1 ELSE 0 END), 0) as "Active"
        FROM months m
        LEFT JOIN "CustomerMeters" cm ON 
          date_trunc('month', cm."createdAt") = m.month
        GROUP BY m.month
        ORDER BY m.month ASC
      `,
        {
          type: sequelize.QueryTypes.SELECT,
          bind: [year],
        }
      );

      console.log("Meter status query result:", meterStatus);
      resolve(meterStatus);
    } catch (error) {
      console.error("Meter Status Error:", error);
      reject({
        error: "Failed to retrieve meter status",
        details: error.message,
      });
    }
  });
};
