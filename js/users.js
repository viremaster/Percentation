const express = require("express");
const router = express.Router();
const db = require("./db.js");

router.get("/app/users", async function (req, res) {
    let query = `SELECT * FROM public.users`;
    let users = await db.select(query);
    console.log("Users !!!")
    console.log(users);
    if (users) {
        res.status(200).json(JSON.parse(users));
    } else {
        console.log("error2  ")
    }
    res.end();
});
router.post("/app/user", async function (req, res) {
    let email = req.body.email;
    let username = req.body.name;
    let passwordHash = req.body.password;
    let userRole = 1;

    let query = `INSERT INTO "public"."users" ("username", "userid", "email", "role", "password") VALUES('${username}', DEFAULT, '${email}', '${userRole}', '${passwordHash}')RETURNING "username", "userid", "email", "role", "password"`;

    let code = await db.insert(query) ? 200 : 500;
    res.status(code).end();
});
router.get("/app/user/:username", function (req, res) {
    let passwordHash = req.body.password;
    let username = req.params.username;

    let query = `Select * from users where userName='${username}'and paswword='${passwordHash}'`;

    let user = db.select(query);

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(400);
    }
    res.end();
})

module.exports = router;