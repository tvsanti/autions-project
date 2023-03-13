const db = require('../config/database')
const connection = db()

const getProducts = (result) => {
    connection.query("SELECT * FROM producto", (err, results) => {        
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

module.exports = getProducts