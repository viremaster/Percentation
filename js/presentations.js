const express = require("express");
const router = express.Router();
const db = require("./db.js");
const authenticated = require("./authentication.js");


router.get("/app/presentations", authenticated.valideAuthentication, async function (req, res) {
    let query = `SELECT presentationid,title FROM public.presentations WHERE presentationownerid=${req.token.id}`;
    response = await db.select(query);
    if (response.length>0)
        res.status(200).json(response);
    else
        res.status(404).send("You don't have any presentations");

    res.end;

});

router.get("/app/presentations/public", authenticated.valideAuthentication, async function (req, res) {
    let query = `SELECT presentationid,title FROM public.presentations WHERE visibility='public' AND presentationownerid!='${req.token.id}'`
    let response = await db.select(query);
    if (response.length>0)
        res.status(200).json(response);
    else
        res.status(404);
    res.end();
})

router.get("/app/presentation/:id", authenticated.valideAuthentication, async function (req, res) {
    let presentationid = req.params.id;
    let query = `SELECT data,notes FROM public.presentations WHERE presentationownerid=${req.token.id} AND presentationid=${presentationid}`;
    response = await db.select(query);
    response = response[0];
    res.status(200).send(response);
    res.end();

})

router.post("/app/presentation", authenticated.valideAuthentication, async function (req, res) {
    let data = req.body.data;
    let notes = req.body.notes;
    let title = req.body.title;
    console.log(title);
    let query = `INSERT INTO "public"."presentations" ("presentationid","presentationownerid","data","visibility","sharediduser","notes","title") VALUES(DEFAULT,'${req.token.id}','${data}',DEFAULT,DEFAULT,'${notes}','${title}') RETURNING "presentationid","presentationownerid"`;
    response = await db.insert(query);
    response = response[0];
    res.status(200).json(response);
    res.end();
});

router.delete("/app/presentation/:id", authenticated.valideAuthentication, async function (req, res) {
    let query = `DELETE FROM "public"."presentations" WHERE presentationid='${req.params.id}' AND presentationownerid='${req.token.id}' RETURNING "presentationid"`;
    response = await db.delete(query);
    response = response[0];
    res.status(200).json(response);
    res.end();
});

router.put("/app/presentation/:id", authenticated.valideAuthentication, async function (req, res) {
    let data = req.body.data;
    let notes = req.body.notes;
    let presentationid = req.params.id;
    let query = `UPDATE public.presentations SET data='${data}',notes='${notes}' WHERE presentationid='${presentationid}' AND presentationownerid='${req.token.id}' RETURNING "presentationid"`;
    let response = await db.update(query);
    response = response[0];
    res.status(200).json(response);
    res.end();
})

router.get("/application", function (req, res) {
    res.sendFile(__dirname + "/Application.html");
})

router.put("/app/presentation/:visibility/:id", authenticated.valideAuthentication, async function (req, res) {
    let visibility = req.params.visibility;
    let presentationid = req.params.id;
    let query = `UPDATE public.presentations SET visibility='${visibility}' WHERE presentationid='${presentationid}' AND presentationownerid='${req.token.id}' RETURNING "presentationid"`;
    let response = await db.update(query);
    if (response.length>0) {
        response = response[0];
        res.status(200).json(response);
    } else {
        res.status(401).send("You are not authorized to do this")
    }

    res.end()
})

router.get("/app/presentation/public/:id", authenticated.valideAuthentication, async function (req, res) {
    let presentationid = req.params.id;
    let query = `SELECT data,notes FROM public.presentations WHERE visibility='public' AND presentationid=${presentationid}`;
    response = await db.select(query);
    response = response[0];
    res.status(200).send(response);
    res.end();
})

router.put("/app/share/:username/:presentationid", authenticated.valideAuthentication, async function (req, res) {
    let username = req.params.username;
    let presentationid = req.params.presentationid;
    let query = `SELECT userid from public.users WHERE username='${username}'`
    let response = await db.select(query);
    if (response.length!=0 && username && presentationid) {
        userid = response[0].userid;

        query = `SELECT presentationid from public.presentations WHERE presentationid='${presentationid}' AND presentationownerid='${req.token.id}' AND sharediduser @> '{${userid}}'`
        response = await db.select(query);
        let action;
        if (response.length>0) {
            query = `UPDATE public.presentations SET sharediduser=array_remove(sharediduser,'${userid}') WHERE presentationid='${presentationid}' AND presentationownerid='${req.token.id}' RETURNING "presentationid"`
            action = "unshared";
        } else {
            query = `UPDATE public.presentations SET sharediduser=array_append(sharediduser,'${userid}') WHERE presentationid='${presentationid}' AND presentationownerid='${req.token.id}' RETURNING "presentationid"`
            action = "shared"
        }
        response = await db.update(query);
        if (response.length>0) {
            response = response[0];
            res.status(200).json({
                response: response,
                action: action
            }).end();
        } else {
            res.status(400).send("problem").end();
        }
    } else {

        res.status(400).json("this username does not exists")

    }
})

router.get("/app/presentations/friends", authenticated.valideAuthentication, async function (req, res) {
    let query = `SELECT presentationid,title FROM public.presentations WHERE sharediduser @> '{${req.token.id}}' AND presentationownerid!='${req.token.id}'`
    let response = await db.select(query);
    if (response.length>0)
        res.status(200).send(response);
    else
        res.status(404);
    res.end();
})

router.get("/app/presentation/friends/:id", authenticated.valideAuthentication, async function (req, res) {
    let presentationid = req.params.id;
    let query = `SELECT data,notes FROM public.presentations WHERE sharediduser @> '{${req.token.id}}' AND presentationid='${presentationid}'`;
    let response = await db.select(query);
    response = response[0];
    res.status(200).send(response);
    res.end();
})




module.exports = router;