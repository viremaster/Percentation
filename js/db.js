const {Pool} = require('pg');
const dataBaseUrl = process.env.DATABASE_URL;

const db = {}

async function runQuery(query) {
    console.log("dataBaseUrl : " + dataBaseUrl)
    let response = null;
    const pool = new Pool({
        connectionString:dataBaseUrl,
        ssl:true
    });
    console.log("Client : " + client);
    try {
        const client= await pool.connect()
        if (client) {
            await client.query(query, function (err, res) {
                console.log(res);
                response = res.rows;
                client.end()
            })
        }
    } catch (error) {
        console.log(error);
    }
    return response;
}

db.insert = query => runQuery(query)

db.update = query => runQuery(query)

db.select = query => runQuery(query)

db.delete = query => runQuery(query)

module.exports = db