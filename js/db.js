const {Pool} = require('pg');
const dataBaseUrl = process.env.DATABASE_URL;

const db = {}

function runQuery(query) {
    console.log("dataBaseUrl : " + dataBaseUrl)
    let response = null;
    const pool = new Pool({
        connectionString: dataBaseUrl
    });
    console.log("query : "+query)
    try {
        if (pool) {
            pool.query(query, (err, res) => {
                console.log(res.rows);
                response = res.rows[0];
                pool.end()
            })
        }
    } catch (error) {
        console.log("error");
    }
    return response;
}

db.insert = query => runQuery(query)

db.update = query => runQuery(query)

db.select = query => runQuery(query)

db.delete = query => runQuery(query)

module.exports = db