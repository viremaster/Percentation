const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const users=require("./js/users.js");
const presentations=require("./js/presentations.js");

app.set('port',(process.env.PORT || 8080))
.use(express.static('public'))
.use(bodyParser.json())
.use(presentations)
.use(users)
.listen(app.get('port'),function () {
    console.log('server runnning on :',app.get('port'));    
});

