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
    client.connect();
    client.query(query, function (err, res) {
        response = res.rows;
        console.log(response);
        client.end()
        return response;
    })
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