const {
    Client
} = require('pg');
const dataBaseUrl = process.env.DATABASE_URL;

const db = {}

async function runQuery(query) {
    let response = null;
    const client = await new Client({
        connectionString: dataBaseUrl
    })
    await client.connect();
    let result = await client.query(query);
    let response = await result.rows;
    
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