const {
    Client
} = require('pg');
const dataBaseUrl = process.env.DATABASE_URL;

const db = {}

async function runQuery(query) {
    let response = null;
    const client = new Client({
        connectionString: dataBaseUrl
    })
    client.connect();
    await client.query(query).then(result => {
        response = result.rows;
        client.end();
        return response;
    }).then(res => {
        console.log(res);
    }).catch(e => {
        console.log(e);
    })
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