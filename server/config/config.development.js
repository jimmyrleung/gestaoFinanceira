module.exports = {
    DATABASE_CONFIG: {
        database: "gestaoFinanceira",
        user: "root",
        passwd: "root$",
        dbOptions: {
            host: "127.0.0.1",
            dialect: "mysql",
            pool: { max: 5, min: 0, idle: 10000 },
            logging: false
        }
    },

    MONGODB_OPTIONS: {
        database: "gestaofinanceira",
        host: "mongodb://localhost:27017",
        collections: {
            planosfinanceiros: "planosfinanceiros"
        }
    }
}