const express = require("express");
const router = express.Router();
const db = require("./db.js");

router.get("/app/users", function (req, res) {
        let query = "select * from users";
        let users = db.select(query);
        if (users) {
            res.status(200).json(JSON.parse(users));
        } else {
            console.log("error")
        }
        res.end();
    })
    .post("/app/user", function (req, res) {
        let email = req.body.email;
        let userName = req.body.name;
        let passwordHash = req.body.password;
        let userRole = req.body.userRole;

        let query = `INSERT INTO "users"("username", "email", "role", "password") 
    VALUES('${userName}', '${email}', '${userRole}', ${passwordHash}) RETURNING "userid", "email", "username", "password", "role"`;

        let code = db.insert(query) ? 200 : 500;
        res.status(code).end();
    })
    .get("/app/user/:username", function (req, res) {
        let passwordHash = req.body.password;
        let username = req.params.username;

        let query = `Select * from Users where userName='${username}'and paswword='${passwordHash}'`;

        let user = db.select(query);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(400);
        }
        res.end();
    })

module.exports = router;