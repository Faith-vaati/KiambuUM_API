require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const env = require("./configs/env");
const Auth = require("./libs/Auth/Auth.route");
const { Sequelize, Op } = require("sequelize");
const sequelize = require("./configs/connection");
const CustomerBilling = require("./libs/CustomerBilling/CustomerBilling.route");
const Manholes = require("./libs/Manholes/Manholes.route");
const Mobile = require("./libs/Mobile/Mobile.route");
const Valves = require("./libs/Valves/Valves.route");
const WaterPipes = require("./libs/WaterPipes/WaterPipes.route");
const Sewerlines = require("./libs/SewerLines/Sewerlines.route");
const Tanks = require("./libs/Tanks/Tanks.route");
const Reports = require("./libs/Reports/Reports.route");
const Projects = require("./libs/Projects/Projects.route");
const CustomerMeters = require("./libs/CustomerMeters/CustomerMeters.route");
const CustomerConnections = require("./libs/MawascoTables/customerconnections");
const MawascoTanks = require("./libs/MawascoTables/tanks");
const MawascoValves = require("./libs/MawascoTables/valves");
const CustomerModel = require("./models/CustomerBilling")(sequelize, Sequelize);
const ProjectLines = require("./libs/ProjectsLines/ProjectsLines.route");
const NRW = require("./libs/NRW/NRW.route");
const MawascoProjects = require("./libs/MawascoTables/projects");
const MawascoManholes = require("./libs/MawascoTables/manholes");
const MawascoPRVs = require("./libs/MawascoTables/prvs");
const MawascoMasterMeters = require("./libs/MawascoTables/mastermeters");
const MasterMeters = require("./libs/MasterMeters/MasterMeter.route");
const Washouts = require("./libs/Washouts/Washouts.route");
const PublicUsers = require("./libs/PublicUsers/PublicUsers.route");
const ToolsList = require("./libs/ToolsList/ToolsList.route");
const Categories = require("./libs/Categories/Categories.route");
const IncidentResolution = require("./libs/IncidentResolution/IncidentResolution.route");

const fetch = require("node-fetch");
const path = require("path");
const app = express();
const request = require("request");

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

Auth.AuthRoutes(app);
Mobile.MobileRoutes(app);
CustomerMeters.CustomersRoutes(app);
CustomerBilling.CustomerBillingRoutes(app);
Manholes.ManholeRoutes(app);
Tanks.TanksRoutes(app);
WaterPipes.WaterPipesRoutes(app);
Valves.ValvesRoutes(app);
Sewerlines.SewerlinesRoutes(app);
NRW.NRWRoutes(app);
CustomerConnections.ConnectionsRoutes(app);
Reports.ReportsRoutes(app);
Projects.ProjectsRoutes(app);
ProjectLines.ProjectsLinesRoutes(app);
MawascoTanks.MawascoTanksRoutes(app);
MawascoValves.MawascoValvesRoutes(app);
MawascoProjects.MawascoProjectsRoutes(app);
MawascoManholes.MawascoManholesRoutes(app);
MawascoMasterMeters.MawascoMasterMetersRoutes(app);
MawascoPRVs.MawascoPRVsRoutes(app);
MasterMeters.MasterMetersRoutes(app);
Washouts.WashoutsRoutes(app);
PublicUsers.PublicUsersRoutes(app);
ToolsList.ToolsListRoutes(app);
Categories.CategoriesRoutes(app);
IncidentResolution.IncidentResolutionRoutes(app);

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
