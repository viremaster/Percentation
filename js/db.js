const {
    Client
} = require('pg');
const dataBaseUrl = process.env.DATABASE_URL;

const db = {}

let runQuery = function (query) {
    let response = null;
    const client = new Client({
        connectionString: dataBaseUrl
    });
    client.connect();
    client.query(query, function (err, res) {
        response = res.rows;
        client.end()
    })
    console.log("Response : "+response)
    return response;
}

db.insert = function (query) {
    return runQuery(query)
}

db.update = function (query) {
    return runQuery(query)
}
db.select = function (query) {
    return runQuery(query)
}

db.delete = function (query) {
    return runQuery(query)
}

module.exports = db