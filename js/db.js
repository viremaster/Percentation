const {
    Client
} = require('pg');
const dataBaseUrl = process.env.DATABASE_URL;

const db = {}

let runQuery = async function (query) {
    let response = null;
    const client = new Client({
        connectionString: dataBaseUrl
    });
    await client.connect();
    await client.query(query, function (err, res) {
        response = res.rows;
        client.end()
        return response;
    })
}

db.insert = function (query) {
    runQuery(query)
}

db.update = function (query) {
    runQuery(query)
}
db.select = function (query) {
    runQuery(query)
}

db.delete = function (query) {
    runQuery(query)
}

module.exports = db