const {
    Client
} = require('pg');
const dataBaseUrl = process.env.DATABASE_URL;

const db = {}

async function runQuery(query) {
    let response = null;
    const client = await new Client({
        connectionString: dataBaseUrl,
        ssl = true
    })
    try {
        await client.connect()
        response = await client.query(query).then(function (res) {
            return res;
        }).catch(function (err) {
            console.error(err);
        })
    } catch (e) {
        console.error(e);
        return response;
    }
}

db.insert = async function (query) {
    return await runQuery(query)
}

db.update = async function (query) {
    return await runQuery(query)
}
db.select = async function (query) {
    return await runQuery(query)
}

db.delete = async function (query) {
    return await runQuery(query)
}

module.exports = db