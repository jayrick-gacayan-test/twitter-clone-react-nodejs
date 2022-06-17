const { authorizeJwt } = require("../middlewares");
const authController = require('../controllers').auth;
const router = require('express').Router();

module.exports = (app) => {
    app.use("/api/user", router);

    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        ); //headers
        
        next();
    });

    
    router.post("/register", authController.register);
    router.post("/login", authController.logIn);
    router.get("/:userId/auth", 
                [ authorizeJwt.verifyToken ],
                authController.authUser);    
}