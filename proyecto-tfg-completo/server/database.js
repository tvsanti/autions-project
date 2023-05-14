const mysql = require('mysql2/promise')
const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } = require('./config.js')

module.exports = () => {
    return mysql.createPool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE,
    })
}
