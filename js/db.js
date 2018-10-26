const pg= require('pg');
const dataBaseUrl = process.env.DATABASE_URL;

const db = {}

function runQuery(query) {
    console.log("dataBaseUrl : "+dataBaseUrl)
    let response = null;
    const client = new pg.Client({dataBaseUrl});
    try {
        client.connect()
        if (client) {
            client.query(query, (err, res) => {
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