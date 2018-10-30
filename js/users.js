const express = require("express");
const router = express.Router();
const db = require("./db.js");

router.get("/app/users", async function (req, res) {
    let query = `SELECT * FROM public.users`;
    let users = await db.select(query);
    console.log("Users !!!")
    console.log(users);
    if (users) {
        res.status(200).json(users);
    } else {
        console.log("error2  ")
    }
    res.end();
});
router.post("/app/user", async function (req, res) {
    let email = req.body.email;
    let username = req.body.name;
    let password = req.body.password;
    let userRole = 1;

    let query = `INSERT INTO "public"."users" ("username", "userid", "email", "role", "password") VALUES('${username}', DEFAULT, '${email}', '${userRole}', '${password}')RETURNING "username", "userid", "email", "role", "password"`;

    let code = await db.insert(query) ? 200 : 500;
    res.status(code).end();
});
router.get("/app/user/:username", async function (req, res) {
    let auth = req.headers.Authorization;
    if (auth) {
        let tmp = auth.split(' ');
        let buf = new Buffer(tmp[1], 'base64');
        let stringAuth = buf.toString();
        let credentials = stringAuth.split(':');
        let username = credentials[0];
        let password = credentials[1];

        let query = `Select * from public.users where username='${username}'and password='${password}'`;

        let user = await db.select(query);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(400);
        }
        res.end();
    } else {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');

        res.end('<html><body>Need some creds son</body></html>');
    }
})

module.exports = router;