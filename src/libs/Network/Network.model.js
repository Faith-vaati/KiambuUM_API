const { Sequelize } = require("sequelize");
const sequelize = require("../../configs/connection");
const CustomerMeters = require("../../models/CustomerMeters")(
  sequelize,
  Sequelize
);
const MasterMeters = require("../../models/MasterMeters")(sequelize, Sequelize);
const Tanks = require("../../models/Tanks")(sequelize, Sequelize);
const WaterPipes = require("../../models/WaterPipes")(sequelize, Sequelize);
const ProductionMeters = require("../../models/ProductionMeters")(
  sequelize,
  Sequelize
);
const Manholes = require("../../models/Manholes")(sequelize, Sequelize);
const ConnectionChamber = require("../../models/ConnectionChamber")(
  sequelize,
  Sequelize
);
const CustomerChamber = require("../../models/CustomerChamber")(
  sequelize,
  Sequelize
);
const SewerLines = require("../../models/Sewerlines")(sequelize, Sequelize);

exports.getNetworkStats = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let stats = {};

      try {
        const [customerMeters] = await sequelize.query(`
          SELECT COUNT(*)::int as total 
          FROM "CustomerMeters"
        `);
        stats.customerMeters = customerMeters[0]?.total || 0;
      } catch (e) {
        console.error("Customer Meters query failed:", e);
      }

      try {
        const [masterMeters] = await sequelize.query(`
          SELECT 
            COUNT(*)::int as total,
            COUNT(CASE WHEN "MeterType" = 'Bulk' THEN 1 END)::int as bulk_meters
          FROM "MasterMeters"
        `);
        stats.masterMeters = masterMeters[0]?.total || 0;
        stats.bulkMeters = masterMeters[0]?.bulk_meters || 0;
      } catch (e) {
        console.error("Master Meters query failed:", e);
      }

      try {
        const [productionMeters] = await sequelize.query(`
          SELECT COUNT(*)::int as total 
          FROM "ProductionMeters"
        `);
        stats.productionMeters = productionMeters[0]?.total || 0;
      } catch (e) {
        console.error("Production Meters query failed:", e);
      }

      try {
        const [tanks] = await sequelize.query(`
          SELECT COUNT(*)::int as total 
          FROM "Tanks"
        `);
        stats.tanks = tanks[0]?.total || 0;
      } catch (e) {
        console.error("Tanks query failed:", e);
      }

      try {
        const [waterPipes] = await sequelize.query(`
          SELECT COUNT(*)::int as total 
          FROM "WaterPipes"
        `);
        stats.waterPipes = waterPipes[0]?.total || 0;
      } catch (e) {
        console.error("Water Pipes query failed:", e);
      }

      try {
        const [manholes] = await sequelize.query(`
          SELECT COUNT(*)::int as total 
          FROM "Manholes"
        `);
        stats.manholes = manholes[0]?.total || 0;
      } catch (e) {
        console.error("Manholes query failed:", e);
      }

      try {
        const [connectionChambers] = await sequelize.query(`
          SELECT COUNT(*)::int as total 
          FROM "ConnectionChambers"
        `);
        stats.connectionChambers = connectionChambers[0]?.total || 0;
      } catch (e) {
        console.error("Connection Chambers query failed:", e);
      }

      try {
        const [customerChambers] = await sequelize.query(`
          SELECT COUNT(*)::int as total 
          FROM "CustomerChambers"
        `);
        stats.customerChambers = customerChambers[0]?.total || 0;
      } catch (e) {
        console.error("Customer Chambers query failed:", e);
      }

      try {
        const [sewerLines] = await sequelize.query(`
          SELECT COUNT(*)::int as total 
          FROM "SewerLines"
        `);
        stats.sewerLines = sewerLines[0]?.total || 0;
      } catch (e) {
        console.error("Sewer Lines query failed:", e);
      }
      resolve(stats);
    } catch (error) {
      console.error("Network Stats Error:", error);
      reject({
        error: "Failed to retrieve network statistics",
        details: error.message,
      });
    }
  });
};

exports.getMasterMeterBrands = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const brands = await sequelize.query(
        `
        SELECT 
          COALESCE("BrandName", 'Unknown') as name,
          COUNT(*)::int as value
        FROM "MasterMeters"
        GROUP BY "BrandName"
        ORDER BY value DESC
      `,
        {
          type: sequelize.QueryTypes.SELECT,
          raw: true,
        }
      );

      resolve(brands);
    } catch (error) {
      console.error("Master Meter Brands Error:", error);
      reject({
        error: "Failed to retrieve master meter brands",
        details: error.message,
      });
    }
  });
};
