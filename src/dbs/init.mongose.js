const { default: mongoose } = require("mongoose");
const { countConnection } = require("../helpers/check-connection");
const connectString = "mongodb://localhost:27017/shopDEV";

//singleton
class Database {
    constructor() {
        this.connect();
    }
    //connect
    connect(type = "mongodb") {
        mongoose
            .connect(connectString, {
                // kiem tra xem co bao nhieu ket noi khong su dung thi lay de su dung cho tac vu khac khong can open va close thu cong
                // se khong the vuot qua maxPoolSize, 
                // neu ma nhieu hon 50 connect thi connect tu 51 tro di se phai doi khi nao co connect free thi su dung
                maxPoolSize: 100,
            })
            .then(() => {
                console.log("Connect succeeded with numConnections: ", countConnection());
            })
            .catch((err) => {
                console.log(`Error connecting`, err.message);
            });
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const instanceMongoDb = Database.getInstance();
module.exports = instanceMongoDb;
