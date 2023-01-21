const db = require('../config/database')
const connection = db()

connection.query("USE news_portal")

const getProducts = (result) => {
    console.log(result);
    connection.query("SELECT * FROM news", (err, results) => {        
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

module.exports = getProducts