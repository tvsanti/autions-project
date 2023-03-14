const mysql = require('mysql2/promise')

module.exports = () => {
    return mysql.createPool({
        host: "localhost",
        user: "root",
        password: "1234",
        database: 'subasta'
    })
}
