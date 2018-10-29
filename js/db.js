const {
    Client
} = require('pg');
const dataBaseUrl = process.env.DATABASE_URL;

const db = {}
/*
async function runQuery(query) {
    let response = null;
    const client = await new Client({
        connectionString: dataBaseUrl
    })
    await client.connect();
    let result = await client.query(query);
    response = await result.rows;
    return response;
}
*/

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
            return response;
        }
    } catch (e) {
        console.error(e);
    }
}

function getResponse(client, query) {
    let promise = new Promise(function (resolve, reject) {
        client.query(query, (err, res) => {
            console.log(err,res);
            resolve(res);
        });
    })

    promise.then(function(response){
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