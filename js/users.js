const express = require("express");
const router = express.Router();
const db = require("./db.js");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const saltRounds = 10;

const TOKEN_KEY = process.env.TOKEN_KEY;

/*
router.get("/app/users", async function (req, res) {
    let query = `SELECT * FROM public.users`;
    let users = await db.select(query);
    if (users) {
        res.status(200).json(users);
    } else {
        res.status(500);
    }
    res.end();
});
*/
router.post("/app/user", async function (req, res) {
    let email = req.body.email;
    let username = req.body.name;
    let password = req.body.password;
    let userRole = 1;
    await bcrypt.hash(password, saltRounds, async function (err, hash) {
        if (email && username && hash) {
            let query = `INSERT INTO "public"."users" ("username", "userid", "email", "role", "password") VALUES('${username}', DEFAULT, '${email}', '${userRole}', '${hash}')RETURNING "username", "email"`;
            let code = await db.insert(query) ? 200 : 500;
            res.status(code).end();
        }
    })
});
router.get("/app/user", async function (req, res) {
    let auth = req.headers.authorization;
    if (auth) {
        let tmp = auth.split(' ');
        let buf = new Buffer(tmp[1], 'base64');
        let stringAuth = buf.toString();
        let credentials = stringAuth.split(':');
        let email = credentials[0].trim();
        let password = credentials[1].trim();

        let query = `SELECT userid,username,password FROM public.users WHERE email='${email}'`;

        let user = await db.select(query);

        if (user) {
            let correctPassword = await bcrypt.compare(password, user.password);

            if (correctPassword) {
                let token = jwt.sign({
                    id: user.userid,
                    username: user.username
                }, TOKEN_KEY, {
                    expiresIn: 86400
                });


                res.status(200).send({
                    token: token,
                    authenticatedUser: {
                        id: user.userid,
                        username: user.username
                    }
                });
            } else {
                res.status(400).send("Wrong email or password")
            }

        } else
            res.status(400).send("Wrong email or password");
        res.end();
    } else {
        //Do something
    }
});
router.delete("/app/user", async function (req, res) {
    let token = req.headers['x-access-token'];
    let buffToken = new Buffer(token, 'base64');
    let stringToken = buffToken.toString();
    let decodedToken = jwt.decode(stringToken, TOKEN_KEY);
    if (decodedToken) {
        console.log(decodedToken);
        let query=`DELETE FROM "public"."presentations" WHERE presentationownerid='${decodedToken.id}' RETURNING "presentationid"`
        await db.delete(query);
        query = `DELETE FROM "public"."users" WHERE userid='${decodedToken.id}' RETURNING "username", "email"`;
        let response=await db.delete(query)
        res.status(200).json(response);
    } else {
        res.status(400).send("Wrong token");
    }
    res.end();
});
router.put("/app/user", async function (req, res) {
    console.log("yes!");
    let token = req.headers['x-access-token'];
    let buffToken = new Buffer(token, 'base64');
    let stringToken = buffToken.toString();
    let decodedToken = jwt.decode(stringToken, TOKEN_KEY);
    if (decodedToken) {
        let auth = req.headers.authorization;
        let tmp = auth.split(' ');
        let buf = new Buffer(tmp[1], 'base64');
        let stringAuth = buf.toString();
        let credentials = stringAuth.split(':');
        let oldPassword = credentials[0].trim();
        let newPassword = credentials[1].trim();

        let query = `SELECT password FROM public.users WHERE userid='${decodedToken.id}'`;

        let hashPassword = await db.select(query);

        if (hashPassword) {
            let correctPassword = await bcrypt.compare(oldPassword, hashPassword.password);

            if (correctPassword) {
                await bcrypt.hash(newPassword, saltRounds, async function (err, hash) {
                    query = `UPDATE public.users SET password='${hash}' WHERE userid='${decodedToken.id}' RETURNING "userid"`;
                    let code = await db.update(query) ? 200 : 500;
                    res.status(code).send("Password changed").end();
                })
            } else {
                res.status(400).send("Wrong password").end();
            }
        } else {
            res.status(500).send("Problème with the server").end();;
        }
    } else {
        res.status(400).send("Wrong token").end();
    }
})

module.exports = router;