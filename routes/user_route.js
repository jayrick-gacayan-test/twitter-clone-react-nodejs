const usersController = require("../controllers").users;
const { authorizeJwt } = require("../middlewares");
const router = require('express').Router();
module.exports = (app) => {
    
    app.use("/api/users", router);
    
    // get users by id
    router.get("/:userId", 
        usersController.show);

    // get all users
    router.get("/",
        usersController.showAll);

    // update user profile
    router.put("/:userId", 
            [ authorizeJwt.verifyToken ],
            usersController.update);

    // follow user
    router.patch("/:followingId/follow",
            [ authorizeJwt.verifyToken ],
            usersController.follow);
}