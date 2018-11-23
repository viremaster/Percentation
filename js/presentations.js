const express = require("express");
const router = express.Router();
const db = require("./db.js");
const TOKEN_KEY = process.env.TOKEN_KEY;
const jwt = require('jsonwebtoken');


router.get("/app/presentations", async function (req, res) {
    let token = req.headers['x-access-token'];
    let buffToken = new Buffer(token, 'base64');
    let stringToken = buffToken.toString();
    let decodedToken = jwt.decode(stringToken, TOKEN_KEY);
    if (decodedToken) {
        let query = `SELECT presentationid FROM public.presentations WHERE presentationownerid=${decodedToken.id}`;
        response = await db.select(query);
        if (response) {
            res.status(200).send(response);
        } else {
            res.status(200).send("You don't have any presentations")
        }
    } else {
        res.status(400).send("Wrong token");
    }
    res.end;

});

router.get("/app/presentation/:id", async function (req, res) {

    let presentationid = req.params.id;
    let token = req.headers['x-access-token'];
    let buffToken = new Buffer(token, 'base64');
    let stringToken = buffToken.toString();
    let decodedToken = jwt.decode(stringToken, TOKEN_KEY);
    if (decodedToken) {
        let query = `SELECT data FROM public.presentations WHERE presentationownerid=${decodedToken.id} AND presentationid=${presentationid}`;
        response = await db.select(query);
        res.status(200).send(response);
    } else {
        res.status(400).send("Wrong token");
    }
    res.end();

})

router.post("/app/presentation", async function (req, res) {
    let data = req.body.data;

    let token = req.headers['x-access-token'];
    let buffToken = new Buffer(token, 'base64');
    let stringToken = buffToken.toString();
    let decodedToken = jwt.decode(stringToken, TOKEN_KEY);

    if (decodedToken) {
        let query = `INSERT INTO "public"."presentations" ("presentationid","presentationownerid","data") VALUES(DEFAULT,'${decodedToken.id}','${data}') RETURNING "presentationid","presentationownerid"`;
        response = await db.insert(query);
        res.status(200).json(response);
    } else {
        res.status(400).send("Wrong token");
    }
    res.end();
});

router.delete("/app/presentations", function (req, res) {

});

router.get("/application",function(req,res){
    res.sendFile(__dirname+"/Application.html");
})
    


module.exports = router;