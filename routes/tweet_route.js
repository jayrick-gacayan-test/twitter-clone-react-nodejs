const { authorizeJwt } = require("../middlewares");
const tweetsController = require("../controllers").tweets;

module.exports = app => {
    app.get("/api/tweets/:tweetId",
        tweetsController.show);

    app.get("/api/tweets/",
        tweetsController.showAll
    );

    app.post("/api/tweets/create",
        [ authorizeJwt.verifyToken ],
        tweetsController.create);

    app.delete("/api/tweets/:tweetId",
        [ authorizeJwt.verifyToken ],
        tweetsController.delete);

    app.put("/api/tweets/:tweetId",
        [ authorizeJwt.verifyToken ],
        tweetsController.update);
}