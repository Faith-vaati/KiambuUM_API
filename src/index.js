require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const moment = require("moment");

const env = require("./configs/env");
const Auth = require("./libs/Auth/Auth.route");
const sequelize = require("./configs/connection");
const { Sequelize, Op } = require("sequelize");
const CustomerBilling = require("./libs/CustomerBilling/CustomerBilling.route");
const Manholes = require("./libs/Manholes/Manholes.route");
const Mobile = require("./libs/Mobile/Mobile.route");
const Valves = require("./libs/Valves/Valves.route");
const WaterPipes = require("./libs/WaterPipes/WaterPipes.route");
const Sewerlines = require("./libs/SewerLines/Sewerlines.route");
const Tanks = require("./libs/Tanks/Tanks.route");
const Reports = require("./libs/Reports/Reports.route");
const CustomerMeters = require("./libs/CustomerMeters/CustomerMeters.route");
const CustomerModel = require("./models/CustomerBilling")(sequelize, Sequelize);
const MasterMeters = require("./libs/MasterMeters/MasterMeter.route");
const Washouts = require("./libs/Washouts/Washouts.route");
const PublicUsers = require("./libs/PublicUsers/PublicUsers.route");
const Categories = require("./libs/Categories/Categories.route");
const ProductionMeters = require("./libs/ProductionMeters/ProductionMeters.route");
const CustomerChamber = require("./libs/CustomerChamber/CustomerChamber.route");
const DMAMeterReadings = require("./libs/DMAMeterReadings/DMAMeterReadings.route");
const ConnectionChamber = require("./libs/ConnectionChamber/ConnectionChamber.route");
const Offtake = require("./libs/Offtakes/Offtakes.route");
const TreatmentPlant = require("./libs/TreatmentPlant/TreatmentPlant.route");
const CustomerMeterReadings = require("./libs/CustomerMeterReadings/CustomerMeterReadings.route");
const Boreholes = require("./libs/Boreholes/Boreholes.route");
const NewWaterConnections = require("./libs/NewWaterConnections/NewWaterConnections.route");
const NewSanitationConnections = require("./libs/NewSanitationConnections/NewSanitationConnections.route");
const NewConsumerLineConnections = require("./libs/NewConsumerLineConnection/NewConsumerLineConnection.route");
const NewCustomerLineConnections = require("./libs/NewCustomerLineConnection/NewCustomerLineConnection.route");
const ProductionMeterReadings = require("./libs/ProductionMeterReadings/ProductionMeterReadings.route");
const NRWInterventions = require("./libs/NRWInterventions/NRWInterventions.route");
const NRWMeterReading = require("./libs/NRWMeterReadings/NRWMeterReadings.route");
const NRWLeakages = require("./libs/NRWLeakages/NRWLeakages.route");

const fetch = require("node-fetch");
const path = require("path");
const app = express();
const request = require("request");
// const NewWaterConnections = require("./models/NewWaterConnections");

// Dev Mode
app.use(function (req, res, next) {
  if (req.url.includes("/api")) {
    req.url = req.url.toString().replace("/api", "");
  }
  next();
});

//geoserver
app.use(function (req, res, next) {
  try {
    if (req.url.split("/")[1] === "geoserver") {
      req.pipe(request(`https://geoserver.mawasco.co.ke${req.url}`)).pipe(res);
    } else {
      next();
    }
  } catch (error) {}
});

app.use("/uploads", express.static("uploads"));
app.use(
  express.json({ limit: "500mb", extended: true, parameterLimit: 10000000 })
);
app.use(
  express.urlencoded({
    limit: "500mb",
    extended: true,
    parameterLimit: 10000000,
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/ol", express.static(path.join(__dirname, "public/ol")));
app.use("/js", express.static(path.join(__dirname, "public/js")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

let urls = [
  "https://utilitymanager.mawasco.co.ke",
  "http://localhost",
  "http://localhost:3000",
];

function getUrl(url) {
  switch (url) {
    case urls[0]:
      return urls[0];
    case urls[1]:
      return urls[1];
    case urls[2]:
      return urls[2];
    default:
      return "";
  }
}

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", getUrl(req.headers.origin));
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, Content-Type, X-Requested-With, Range"
  );
  if (req.method === "OPTIONS") {
    return res.send(200);
  } else {
    return next();
  }
});

app.get("/homepage", (req, res) => {
  res.render("home");
});

app.get("/mapline", (req, res) => {
  res.render("lines");
});

app.get("/mapped", (req, res) => {
  res.render("mapped");
});

app.get("/googlemap", (req, res) => {
  res.render("googleMap");
});

app.get("/geojson/:table", async (req, res) => {
  const tableName = req.params.table;
  try {
    // Query to select only valid geometries
    const [data, meta] = await sequelize.query(`
      SELECT jsonb_build_object(
        'type', 'FeatureCollection',
        'features', jsonb_agg(jsonb_build_object(
          'type', 'Feature',
          'geometry', ST_AsGeoJSON(geom)::jsonb,
          'properties', to_jsonb(row) - 'geom'
        ))
      ) AS data
      FROM (
        SELECT *
        FROM "${tableName}"
        WHERE ST_IsValid(geom) -- Filter for valid geometries
      ) row;
    `);

    res.status(200).json(data[0].data);
  } catch (error) {
    console.log(error);
    res
      .status(203)
      .json({ error: "An error occurred while fetching GeoJSON data." });
  }
});

Auth.AuthRoutes(app);
Mobile.MobileRoutes(app);
CustomerMeters.CustomersRoutes(app);
CustomerBilling.CustomerBillingRoutes(app);
Manholes.ManholeRoutes(app);
Tanks.TanksRoutes(app);
WaterPipes.WaterPipesRoutes(app);
Valves.ValvesRoutes(app);
Sewerlines.SewerlinesRoutes(app);
Reports.ReportsRoutes(app);
MasterMeters.MasterMetersRoutes(app);
Washouts.WashoutsRoutes(app);
PublicUsers.PublicUsersRoutes(app);
Categories.CategoriesRoutes(app);
ProductionMeters.ProductionMetersRoutes(app);
CustomerChamber.CustomerChamberRoutes(app);
ConnectionChamber.ConnectionChamberRoutes(app);
Offtake.OfftakesRoutes(app);
TreatmentPlant.TreatmentPlantRoute(app);
CustomerMeterReadings.CustomerMeterReadingsRoutes(app);
Boreholes.BoreholesRoutes(app);
NewWaterConnections.NewWaterConnectionsRoutes(app);
NewSanitationConnections.NewSanitationConnectionsRoutes(app);
NewConsumerLineConnections.NewConsumerLineConnectionRoutes(app);
NewCustomerLineConnections.NewCustomerLineConnectionRoutes(app);
DMAMeterReadings.DMAMeterReadingsRoutes(app);
ProductionMeterReadings.ProductionMeterReadingsRoutes(app);
NRWInterventions.NRWInterventionRoutes(app);
NRWMeterReading.NRWMeterReadingsRoutes(app);
NRWLeakages.NRWLeakagesRoutes(app);

app.get("/update/:scheme/:start", (req, res) => {
  fetch(
    `http://102.217.125.71/usr/fetchCustomersMathiraApi.action?scId=${req.params.scheme}&start=${req.params.start}&limit=30000`
  )
    .then((res) => {
      if (res.ok) return res.json();
      else throw Error("");
    })
    .then(async (data) => {
      let n = await updateBilling(data.jsonData);
      res.send({ Updated: n });
    })
    .catch((err) => {});
});

app.get("/insert/:scheme/:start", (req, res) => {
  fetch(
    `http://102.217.125.71/usr/fetchCustomersMathiraApi.action?scId=${req.params.scheme}&start=${req.params.start}&limit=30000`
  )
    .then((res) => {
      if (res.ok) return res.json();
      else throw Error("");
    })
    .then(async (data) => {
      let n = await createNew(data.jsonData);
      res.send({ Created: n });
    })
    .catch((err) => {});
});

async function getAccessToken() {
  const url =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  const auth = Buffer.from(
    `${process.env.DARAJA_CONSUMER_KEY}:${process.env.DARAJA_CONSUMER_SECRET}`
  ).toString("base64");

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    console.log(`Token: ${response.data.access_token}`);
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw new Error("Unable to fetch access token");
  }
}

// Wallet top-up endpoint
app.post("/processrequest", async (req, res) => {
  const { phone_number, amount } = req.body;

  // Ensure phone and amount are valid
  if (!phone_number || !amount) {
    return res
      .status(400)
      .json({ error: "Phone number and amount are required!" });
  }

  try {
    const response = await stkPush(phone_number, amount);
    res.json({
      success: true,
      message: "STK push initiated",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error initiating STK push",
    });
  }
});

async function stkPush(phone, amount) {
  try {
    const accessToken = await getAccessToken();
    const url =
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    const timestamp = moment().format("YYYYMMDDHHmmss");
    const password = Buffer.from(
      `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString("base64");

    const payload = {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: "WalletTopUp",
      TransactionDesc: "Top up your wallet",
    };

    const response = await axios.post(url, payload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    console.log("STK push initiated successfully.");
    return response.data;
  } catch (error) {
    console.error("Error initiating STK push:", error);
    throw new Error("STK Push request failed");
  }
}

async function createNew(data) {
  let number = 0;
  for (var i = 0; i < data.length; i++) {
    const body = {
      Amount: data[i].invoAmount != null ? data[i].invoAmount : 0,
      CurrentBalance: data[i].cAccBal != null ? data[i].cAccBal : 0,
      PreviousBalance:
        data[i].previousBalance != null ? data[i].previousBalance : 0,
      CreatedDate: data[i].invoCreatedDate,
      DueDate: data[i].invoDueDate,
      Phone: data[i].cMobileNumber,
      Account: data[i].defaultAccNumber.split("-")[0],
      Name: data[i].accountName,
      Zone: data[i].znName,
      Scheme: data[i].scName,
      Route: data[i].rtName,
      MeterStatus: data[i].cAccountMeterStatus,
      AccountStatus: data[i].cAccountStatus,
      MeterSize: data[i].custMtrSize,
      ParcelNo: data[i].custLandNo,
    };

    try {
      await CustomerModel.create(body);
      number += 1;
    } catch (error) {
      console.log(error);
    }
  }
  return number;
}

async function updateBilling(data) {
  let number = 0;
  for (var i = 0; i < data.length; i++) {
    try {
      const [response, meta] =
        await sequelize.query(`UPDATE public."CustomerBillings" SET "Amount" = '${
          data[i].invoAmount ? data[i].invoAmount : 0
        }',"CurrentBalance" = '${
          data[i].cAccBal ? data[i].cAccBal : 0
        }', "PreviousBalance" = '${
          data[i].previousBalance ? data[i].previousBalance : 0
        }',"CreatedDate" = '${data[i].invoCreatedDate}',   "DueDate" = '${
          data[i].invoDueDate
        }', "MeterSize" = '${data[i].custMtrSize}', "MeterStatus" = '${
          data[i].cAccountMeterStatus
        }',"AccountStatus" = '${data[i].cAccountStatus}', 
        "Zone" = '${data[i].znName}',
        "ParcelNo" = '${data[i].custLandNo}'
      WHERE "Account" = '${zeroPad(data[i].defaultAccNumber.split("-")[0])}'
      `);

      if (meta.rowCount === 1) {
        number += 1;
      }
    } catch (error) {}
  }
  return number;
}

const zeroPad = (num) => String(num).padStart(5, "0");

app.listen(env.port, function () {
  console.log("app listening at port %s", env.port);
});
