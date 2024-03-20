const { default: mongoose } = require("mongoose");
const os = require("os");
const process = require("process");

const _SECOND = 5000;
const countConnection = () => {
    const numConnections = mongoose.connections.length;
    console.log("Number of connections:", numConnections);
    return numConnections;
};

//check overload
const checkOverload = () => {
    setInterval(() => {
        const numConnections = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        const maxConnections = numCores * 5 - 10; // gan het thi thong bao chu khong len de het roi moi bao

        console.log(`Active connections: ${numConnections}`);
        console.log(`Memory usage:: ${memoryUsage / 1024 / 1024} MB`);

        if (numConnections > maxConnections) {
            console.log("Connections overload detected");
            //notify.send(....)
        }
    }, _SECOND);
};
module.exports = { countConnection, checkOverload };
