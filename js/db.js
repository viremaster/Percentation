const {
    Client
} = require('pg');
const dataBaseUrl = process.env.DATABASE_URL;

const db = {}

function runQuery(query) {
    let response = null;
    const client = new Client({
        connectionString: dataBaseUrl
    })

    try {
        client.connect()
        if (client) {
            client.query(query, (err, res) => {
                console.log(err, res)
                response = res.rows;
                client.end()
            })

        };
    } catch (e) { /*OOPS*/ }

    return respons;
}

function runQuery(query){
    let response = null;
    const client = new Client({
        connectionString: dataBaseUrl
    })
    client.connect();
    client.query(query).then(result => {
        response=result.rows;
        client.end();
        return response;
    }).then(res => {
        console.log(res);
    }).catch(e => {
        console.log(e);
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