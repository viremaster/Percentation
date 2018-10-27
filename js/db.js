const {
    Client
} = require('pg');
const dataBaseUrl = process.env.DATABASE_URL;

const db = {}

function runQuery(query) {
    let response = null;
    const client = new Client({
        connectionString: dataBaseUrl
    });
    try {
        client.connect();
        if (client) {
            client.query(query, function (err, res) {
                console.log(res.rows);
                response = res.rows;
                client.end()
            })
        }
    } catch (error) {
        console.log("error1");
    }
    console.log("reponse : "+response);
    return response;
}

db.insert = query => runQuery(query)

db.update = query => runQuery(query)

db.select = query => runQuery(query)

db.delete = query => runQuery(query)

module.exports = db