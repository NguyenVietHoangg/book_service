import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import moment from "moment";
import session from "express-session";
import listEndpoints from "express-list-endpoints";
import { createClient } from "redis";
import expressSanitizer from "express-sanitizer";
import cron from "cron";
import timeout from "connect-timeout";

// import crontab from './crontab'
import { timeLog } from "./middlewares/common";
import cmsRouter from "./routes/cms";
import clientRouter from "./routes/client";
import userRouter from "./routes/user";

import cache from "./cache";
import { TIMEZONE } from "./config/common";
import winston from "./config/logFile";
import {checkRole} from "./middlewares/authCms";
import cmsSetting from "./middlewares/setting";
import handleInputs from "./middlewares/handleInputs";
import { syncPermissions } from "./helpers/syncPermission";
import { RELOAD_ALL_ROUTERS_CMS } from "./config/common";
import constantConfig from "./config/constant";
import { error } from "shelljs";
let RedisStore = require("connect-redis")(session);
const redis = createClient({
  host: process.env.DEV_CACHE_HOST,
  port: process.env.DEV_CACHE_PORT,
  ttl: 86400,
});
dotenv.config({ path: `${__dirname}/.env` });
moment.tz.setDefault(TIMEZONE);
moment.locale("vi");

// chạy job lấy dữ liệu
// const job = new cron.CronJob({
//   cronTime: '* * * * *', // Chạy Jobs vào 2h30 hằng đêm
//   onTick: function() {
//     crontab()
//     console.log('Cron jub runing cronjob ...');
//   },
//   start: true,
//   timeZone: 'Asia/Ho_Chi_Minh' // Lưu ý set lại time zone cho đúng
// });
// job.start();

const app = express();
app.use(timeout("5s"));
app.all("/", 
function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(cors());
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use(express.static("public"));

// set .html as the default extension
// app.set('view engine', 'html');
// app.set('views', __dirname + '/src/views');

app.set("views", "./src/views");
app.set("view engine", "pug");

app.use(logger("combined", { stream: winston.stream }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(expressSanitizer());
app.use(cookieParser());
app.use(timeLog);

app.use("/cms",checkRole, cmsRouter);
app.use("/client",checkRole, handleInputs, clientRouter);
app.use("/",  userRouter);

// reload all routers
const isReloadEndpoint = cache.get(RELOAD_ALL_ROUTERS_CMS);
if (isReloadEndpoint || 1 === 1) {
  const listRouters = listEndpoints(app);
 
  syncPermissions(listRouters);
}
app.use(haltOnTimedout);
function haltOnTimedout(req, res, next) {
  if (!req.timedout) {
    next();
  }
}
export default app;
