const { Sequelize, Op } = require("sequelize");
const sequelize = require("../../configs/connection");
const CustomerBilling = require("../../models/CustomerBilling")(
  sequelize,
  Sequelize
);

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

exports.findManagementData = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { offset = 0, search = "", year, month } = req.query;

      console.log(req.query);

      let whereClause = {};
      if (year) {
        whereClause.Period = year;
      }
      if (month) {
        whereClause.Period = {
          [Op.like]: `${year}-${String(month).padStart(2, "0")}%`,
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
            { Period: { [Op.iLike]: `%${search}%` } },
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

exports.findCharts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [znOther, znCrdmeta] = await sequelize.query(
        `SELECT "Zone" AS name, SUM("CurrentBalance")::int AS "CurrentBalance",
         SUM("PreviousBalance")::int AS "PreviousBalance",
         SUM("Amount")::int AS "InvoiceAmount"
      FROM "CustomerBillings"   GROUP BY "Zone";`
      );
      const [scOther, scCrdmeta] = await sequelize.query(
        `SELECT "Scheme" AS name, SUM("CurrentBalance")::int AS "CurrentBalance",
         SUM("PreviousBalance")::int AS "PreviousBalance",
         SUM("Amount")::int AS "InvoiceAmount"
      FROM "CustomerBillings"   GROUP BY "Scheme";`
      );

      const [msOther, msCrdmeta] = await sequelize.query(
        `SELECT "MeterStatus" AS name, SUM("CurrentBalance")::int AS "CurrentBalance",
         SUM("PreviousBalance")::int AS "PreviousBalance",
         SUM("Amount")::int AS "InvoiceAmount"
      FROM "CustomerBillings"   GROUP BY "MeterStatus";`
      );

      const [asOther, asCrdmeta] = await sequelize.query(
        `SELECT "AccountStatus" AS name, SUM("CurrentBalance")::int AS "CurrentBalance",
         SUM("PreviousBalance")::int AS "PreviousBalance",
         SUM("Amount")::int AS "InvoiceAmount"
      FROM "CustomerBillings"   GROUP BY "AccountStatus";`
      );

      const [rtOther, rtCrdmeta] = await sequelize.query(
        `SELECT r."DMA" AS name, SUM(b."CurrentBalance")::int AS "CurrentBalance",
         SUM(b."PreviousBalance")::int AS "PreviousBalance",
         SUM(b."Amount")::int AS "InvoiceAmount"
      FROM "CustomerBillings" AS b INNER JOIN "CustomerMeters" AS r ON b."Account" = r."AccountNo"   GROUP BY r."DMA";`
      );

      const [atOther, atCrdmeta] = await sequelize.query(
        `SELECT r."AccountType" AS name, SUM(b."CurrentBalance")::int AS "CurrentBalance",
         SUM(b."PreviousBalance")::int AS "PreviousBalance",
         SUM(b."Amount")::int AS "InvoiceAmount"
      FROM "CustomerBillings" AS b INNER JOIN "CustomerMeters" AS r ON b."Account" = r."AccountNo"   GROUP BY r."AccountType";`
      );

      const [updatedAt, upddmeta] = await sequelize.query(
        `SELECT "updatedAt" FROM "CustomerBillings" ORDER BY "updatedAt" DESC OFFSET 0 LIMIT 1`
      );

      resolve({
        znOther: znOther,
        rtOther: rtOther,
        scOther: scOther,
        msOther: msOther,
        asOther: asOther,
        atOther: atOther,
        updatedAt: updatedAt[0]?.updatedAt,
      });
    } catch (error) {
      reject({ error: "failed" });
    }
  });
};

exports.findStats = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [customers, metadata] = await sequelize.query(
        `SELECT Count(*)::int AS total FROM "CustomerBillings"`
      );
      const [cbalance, cbmetadata] = await sequelize.query(
        `SELECT Sum("CurrentBalance")::int as total FROM "CustomerBillings"`
      );
      const [pbalance, pbmetadata] = await sequelize.query(
        `SELECT Sum("PreviousBalance")::int as total FROM "CustomerBillings"`
      );
      const [amount, ametadata] = await sequelize.query(
        `SELECT Sum("Amount")::int as total FROM "CustomerBillings"`
      );
      resolve({
        Customers: customers[0].total,
        CurrentBalance: cbalance[0].total,
        PreviousBalance: pbalance[0].total,
        InvoiceAmount: amount[0].total,
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
