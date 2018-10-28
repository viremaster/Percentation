const {
    Client
} = require('pg');
const dataBaseUrl = process.env.DATABASE_URL+"?ssl=true";

const db = {}
/*
let runQuery = function (query) {
    let response = null;
    const client = new Client({
        connectionString: dataBaseUrl
    });
    client.connect();
    client.query(query, function (err, res) {
        response = res.rows;
        client.end()
        console.log("Response : " + response)
        return response;
    })
}
*/

async function runQuery(query) {
    let response = null;
    const client = new Client({
        connectionString: dataBaseUrl
    })

    try {
        client.connect()
        if (client) {
            client.query(query, (err, res) => {
                console.log(res)
                response = res.rows;
                client.end()
            })

        };
    } catch (e) { /*OOPS*/ }
    console.log("response : "+response);
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