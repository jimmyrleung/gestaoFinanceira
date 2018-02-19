let config = require("./config.development");

config.DATABASE_CONFIG = {
    database: "gestaoFinanceiraTest",
    user: "root",
    passwd: "root$",
    dbOptions: {
        host: "127.0.0.1",
        dialect: "mysql",
        pool: { max: 5, min: 0, idle: 10000 },
        logging: false
    }
};

module.exports = config;