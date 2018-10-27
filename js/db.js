const {
    Client
} = require('pg');
const dataBaseUrl = process.env.DATABASE_URL;

const db = {}

function runQuery(query) {
    let response = 0;
    const client = new Client({
        connectionString: dataBaseUrl
    });
    try {
        client.connect();
        if (client) {
            client.query(query, (err, res) => {
                console.log(err)
                client.end()
                response = res.rows;
            })
        }
    } catch (error) {
        console.log("error1");
    }
    console.log("reponse : "+response);
    return response;
}

db.insert = query => runQuery(query)

db.update = query => runQuery(query)

db.select = query => runQuery(query)

db.delete = query => runQuery(query)

module.exports = db