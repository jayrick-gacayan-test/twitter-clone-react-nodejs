const jwt = require("jsonwebtoken");
const config = require("../config/config");

function verifyToken(req, res, next){
    let token = req.headers["x-access-token"];
    let userId = null;
    
    if(!token) return res.status(403).send({ error: "No token provided"});

    if(req.params.userId) userId = parseInt(req.params.userId);
    if(req.query.userId) userId = parseInt(req.query.userId);

    jwt.verify(token,
        config.jwt_auth.secret,
        (error, decoded) => {

            if(error) return res.status(401).send({ error: "Unauthorized" });
            
            if(userId !== decoded.id) return res.status(401).send({ error: "Unauthorized" });
            
            
            next();
        }
    );
}

module.exports = {
    verifyToken : verifyToken
}