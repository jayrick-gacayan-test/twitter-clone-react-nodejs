const { authorizeJwt } = require("../middlewares");
const tweetsController = require("../controllers").tweets;
const router = require("express").Router();

module.exports = app => {
    
    app.use("/api/tweets", router);

    // create tweet
    router.post("/create",
        [ authorizeJwt.verifyToken ],
        tweetsController.create);

    // like a tweet
    router.post("/:tweetId/like",
        tweetsController.likeTweet);

    // getting specified tweet
    router.get("/:tweetId",
        tweetsController.show);
    
    // getting all tweets
    router.get("/",
        tweetsController.showAll
    );

    // deleting tweet
    router.delete("/:tweetId",
        [ authorizeJwt.verifyToken ],
        tweetsController.delete);
1
    // updating tweet
    router.put("/:tweetId",
        [ authorizeJwt.verifyToken ],
        tweetsController.update);

    
}