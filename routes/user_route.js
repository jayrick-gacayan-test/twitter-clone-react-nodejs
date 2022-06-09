const usersController = require("../controllers").users;
const { authorizeJwt } = require("../middlewares");
module.exports = (app) => {
    
    // get users by id
    app.get("/api/users/:userId", 
        usersController.show);

    // get all users
    app.get("/api/users/",
        usersController.showAll);

    // update user profile
    app.put("/api/users/:userId", 
            [ authorizeJwt.verifyToken ],
            usersController.update);
}