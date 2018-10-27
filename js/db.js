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
        console.log("response 1 : " + res.rows)
        response = res.rows;
        client.end()
    })
    console.log("response  : " + response);
    return response;


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