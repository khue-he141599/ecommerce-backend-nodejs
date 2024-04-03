const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const { checkOverload } = require("./helpers/check-connection");
const router = require("./routes/index");
const app = express();

//hiển thị chi tiết response trả về
app.use(morgan("dev"));

//protected thông tin không bị lộ thông tin api trên website
app.use(helmet());

// su dung comppression giam kichs thuoc van chuyen du lieu cho client
app.use(compression());

// không có thì sẽ không đọc được giá trị req.body
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//init db => không cần đóng connect liên tục vì mongodb hỗ trợ đóng mở 1 cách linh hoạt - muốn disconnect thì sử dụng mongodb.disconnect
require("./dbs/init.mongose");

//kiểm tra kết nối database có bị quá tải không?
// checkOverload();

//khai báo các router của dự án - init middleware trong các router
app.use("/", router);

//handle error
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: "Error",
        code: statusCode,
        message: error.message || "Internal Server Error",
    });
});

module.exports = app;
