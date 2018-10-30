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
    try {
        await client.connect()
        if (client) {
            response = await getResponse(client, query);
            console.log("response : " + response);
        }
    } catch (e) {
        console.error(e);
    } finally {
        return response;
    }
}


function getResponse(client, query) {
    return new Promise(function (resolve, reject) {
        client.query(query, (err, res) => {
            console.log(err, res);
            resolve(res.rows[0]);
        });
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