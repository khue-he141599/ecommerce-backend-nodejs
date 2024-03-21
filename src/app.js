const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const app = express();
const morgan = require("morgan");
const { checkOverload } = require("./helpers/check-connection");
const router = require("./routes/index");
//hien thi chi tiet response tra ve
app.use(morgan("dev"));
//protected infomation khong bi lo thong tin api
app.use(helmet());
// su dung comppression giam kichs thuoc van chuyen du lieu cho client
app.use(compression());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
//init middleware
//init db => khong can dong connect lien tuc vi mongodb ho tro dong mo 1 cac linh hoat
// muon disconnect thi su dung mongodb.disconnect
require("./dbs/init.mongose");
checkOverload();
//init routes

app.use("/", router);

//handle error

module.exports = app;
