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

router.get("/app/presentations/public",authenticated.valideAuthentication,async function(req,res){
    let query=`SELECT presentationid FROM public.presentations WHERE visibility='public'`
    let response=await db.select(query);
    res.status(200).send(response);
    res.end();
})

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
    let query = `INSERT INTO "public"."presentations" ("presentationid","presentationownerid","data","visibility") VALUES(DEFAULT,'${req.token.id}','${data}',DEFAULT) RETURNING "presentationid","presentationownerid"`;
    response = await db.insert(query);
    response = response[0];
    res.status(200).json(response);
    res.end();
});

router.delete("/app/presentation/:id",authenticated.valideAuthentication, async function (req, res) {
    let query=`DELETE FROM "public"."presentations" WHERE presentationid='${req.params.id}' AND presentationownerid='${req.token.id}' RETURNING "presentationid"`;
    response=await db.delete(query);
    response=response[0];
    res.status(200).json(response);
    res.end();
});

router.put("/app/presentation/:id",authenticated.valideAuthentication,async function(req,res){
    let data=req.body.data;
    let presentationid=req.params.id;
    let query = `UPDATE public.presentations SET data='${data}' WHERE presentationid='${presentationid}' AND presentationownerid='${req.token.id}' RETURNING "presentationid"`;
    let response = await db.update(query);
    response=response[0];
    res.status(200).json(response);
    res.end();
})

router.get("/application", function (req, res) {
    res.sendFile(__dirname+"/Application.html");
})

router.put("/app/presentation/:visibility/:id",authenticated.valideAuthentication,async function(req,res){
    let visibility=req.params.visibility;
    let presentationid=req.params.id;
    let query=`UPDATE public.presentations SET visibility='${visibility}' WHERE presentationid='${presentationid}' AND presentationownerid='${req.token.id}' RETURNING "presentationid"`;
    let response=await db.update(query);
    response=response[0];
    res.status(200).json(response);
    res.end()
})

router.get("/app/presentation/public/:id",authenticated.valideAuthentication,async function(req,res){
    let presentationid = req.params.id;
    console.log(presentationid);
    let query = `SELECT data FROM public.presentations WHERE visibility='public' AND presentationid=${presentationid}`;
    response = await db.select(query);
    response = response[0];
    res.status(200).send(response);
    res.end();
})




module.exports = router;