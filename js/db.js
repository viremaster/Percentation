const Client = require("pg");

const dataBaseUrl = process.env.DATA_BASE_URL;

const db = {}

function runQuery(query) {
    let response = null;
    const client = new Client({
        dataBaseUrl: dataBaseUrl
    });
    try {
        client.connect()
        if (client) {
            client.query(query, (err, res) => {
                response = res.rows;
                client.end()
            })
        }
    } catch (error) {
        console.log(error);
    }
    return response;
}

db.insert = query => runQuery(query)

db.update = query => runQuery(query)

db.select = query => runQuery(query)

db.delete = query => runQuery(query)

module.exports = db