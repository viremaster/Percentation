const express = require("express");
const router = express.Router();
const db = require("./db.js");

router.get("/app/users", async function (req, res) {
    let query = `SELECT * FROM public.users`;
    let users = await db.select(query);
    if (users) {
        res.status(200).json(users);
    } else {
        console.log("")
    }
    res.end();
});
router.post("/app/user", async function (req, res) {
    let email = req.body.email;
    let username = req.body.name;
    let password = req.body.password;
    let userRole = 1;
    if (email && username && password) {
        let query = `INSERT INTO "public"."users" ("username", "userid", "email", "role", "password") VALUES('${username}', DEFAULT, '${email}', '${userRole}', '${password}')RETURNING "username", "userid", "email", "role", "password"`;
        let code = await db.insert(query) ? 200 : 500;
        res.status(code).end();
    }
});
router.get("/app/user", async function (req, res) {
    let auth = req.headers.authorization;
    if (auth) {
        let tmp = auth.split(' ');
        let buf = new Buffer(tmp[1], 'base64');
        let stringAuth = buf.toString();
        let credentials = stringAuth.split(':');
        let email = credentials[0];
        let password = credentials[1];

        let query = `SELECT * FROM public.users WHERE email='${email}' AND password='${password}'`;

        let user = await db.select(query);
        if (user != null)
            res.status(200).json(user);
        else
            res.status(400).send("Wrond email or password");
        res.end();
    } else {
        //Do something
    }
})
router.delete("/app/user", async function (req, res) {
    let auth = req.headers.authorization;
    if (auth) {
        let tmp = auth.split(' ');
        let buf = new Buffer(tmp[1], 'base64');
        let stringAuth = buf.toString();
        let credentials = stringAuth.split(':');
        let email = credentials[0];
        let password = credentials[1];

        let query = `DELETE FROM "public"."users" WHERE email='${email}' AND password='${password}'`;

        let response = await db.delete(query);

        res.status(200).json(response);

        res.end();
    } else {
        //Do something
    }
})

module.exports = router;