var exports={};
const TOKEN_KEY = process.env.TOKEN_KEY;
const jwt = require('jsonwebtoken');


exports.valideAuthentication=function(req, res, next) {
    try {
        let token = req.headers['x-access-token'];
        let buffToken = new Buffer(token, 'base64');
        let stringToken = buffToken.toString();

        let decodedToken = jwt.verify(stringToken, TOKEN_KEY);

        req.token=decodedToken;
        next();
    }catch(e){
        res.status(401).end();
    }
}

module.exports=exports;