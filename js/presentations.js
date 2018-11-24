const express = require("express");
const router = express.Router();
const db = require("./db.js");
const TOKEN_KEY = process.env.TOKEN_KEY;
const jwt = require('jsonwebtoken');
const authenticated = require("./authentication.js");


router.get("/app/presentations", authenticated.valideAuthentication, async function (req, res) {
    let query = `SELECT presentationid FROM public.presentations WHERE presentationownerid=${req.token.id}`;
    response = await db.select(query);
    if (response) {
        res.status(200).send(response);
    } else {
        res.status(200).send("You don't have any presentations")
    }
    res.end;

});

router.get("/app/presentation/:id", authenticated.valideAuthentication, async function (req, res) {
    let presentationid = req.params.id;
    let query = `SELECT data FROM public.presentations WHERE presentationownerid=${req.token.id} AND presentationid=${presentationid}`;
    response = await db.select(query);
    response = response[0];
    res.status(200).send(response);
    res.end();

})

router.post("/app/presentation", authenticated.valideAuthentication, async function (req, res) {
    let data = req.body.data;
    let query = `INSERT INTO "public"."presentations" ("presentationid","presentationownerid","data") VALUES(DEFAULT,'${req.token.id}','${data}') RETURNING "presentationid","presentationownerid"`;
    response = await db.insert(query);
    response = response[0];
    res.status(200).json(response);
    res.end();
});

router.delete("/app/presentations", function (req, res) {

});

router.get("/application", function (req, res) {
    res.sendFile(__dirname + "/Application.html");
})




module.exports = router;