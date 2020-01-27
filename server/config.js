const config = {
    sql: {
        connectionLimit: 100,
        host: 'localhost',
        user: 'root',
        password: 'admin',
        database: 'recipies'
    },
    mongo: {
        url: "mongodb://localhost:27017/history"
    }
}

module.exports = config;