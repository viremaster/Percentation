const pg = require('pg');
const dataBaseUrl = process.env.DATABASE_URL;

const db = {}

async function runQuery(query) {
    console.log("dataBaseUrl : " + dataBaseUrl)
    let response = null;
    const pool = new pg.Pool({
        connectionString: dataBaseUrl,
        ssl: true
    });
    console.log("Client : " + pool);
    try {
        const client = await pool.connect();
        const result = await client.query(query);
        response = {
            'results': (result) ? result.rows : null
        };
        console.log(response)
    } catch (error) {
        console.log("problème");
    }
    return response;
}

db.insert = query => runQuery(query)

db.update = query => runQuery(query)

db.select = query => runQuery(query)

db.delete = query => runQuery(query)

module.exports = db