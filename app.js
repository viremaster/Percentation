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
.get("*",function(req,res){
    res.sendFile(__dirname+"/js/404.html");
})
.listen(app.get('port'),function () {
    console.log('server runnning on :',app.get('port'));    
});

