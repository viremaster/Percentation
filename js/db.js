const {Client} = require('pg');
const dataBaseUrl = process.env.DATABASE_URL+"?ssl=true";

const db = {}

async function runQuery(query) {
    console.log("dataBaseUrl : " + dataBaseUrl)
    let response = null;
    const client = new Client({
        connectionString: dataBaseUrl
    });
    console.log("Client : " + client);
    try {
        await client.connect();
        if (client) {
            await client.query(query, (err, res) => {
                done();
                if(err){
                    console.log(err);
                    res.status(400).send(err);
                }
                res.status(200).send(result.rows);
            })
        }
    } catch (error) {
        console.log("error");
    }
    return response;
}

db.insert = query => runQuery(query)

db.update = query => runQuery(query)

db.select = query => runQuery(query)

db.delete = query => runQuery(query)

module.exports = db