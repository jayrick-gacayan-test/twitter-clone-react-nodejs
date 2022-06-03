/* models */
const Tweet = require("../models").Tweet;
const User = require("../models").User;
const Like = require("../models").Like;

exports.show = (req, res) => {
    return Tweet.findByPk(req.params.tweetId, {
                include : {
                    model : User,
                    attributes: [ "email", "firstName", "lastName", "userImage" ]
                }
            })
            .then(
                (tweet) => {
                    if(!tweet) return res.status(404).send({ error: "Tweet not found." });

                    return res.status(200).send(tweet);
                }
            )
            .catch((error) => res.status(400).send(error));
}

exports.showAll = (req, res) => {
    
    const { userId } = req.query;
    console.log("User id === ", userId );
    const userInclude = {
        model: User,
    }

    const tweetCondition = userId ? {
        ...userInclude, 
        attributes: [ "email", "firstName", "lastName", "userImage" ],
            where: {
                id: userId
            }
    }: userInclude;

    return Tweet.findAll({
                include: tweetCondition
            })
            .then(
                (tweets) => {
                    if(!tweets) return res.status(404).send({ error: "You do not have any tweets." });

                    return res.status(200).send(tweets);
                }
            )
            .catch((error) => res.status(403).send(error));
}



exports.create = async(req, res) => {
    const { title, content, userId } = req.body;
    return await Tweet.create({ title, content, userId }, {})
        .then((newTweet) => Tweet.findByPk(newTweet.id, {}))
        .then((newTweet) => {
            return res.status(201).send(newTweet);
        })
        .catch((error) => res.status(400).send(error));
}

exports.delete = async(req, res) => {
    const id = req.params.tweetId;

    return await Tweet.destroy({ where: { id : id }})
        .then(
            (num) => {
                return res.status(num === 1 ? 201: 400)
                    .send({
                        id: id,
                        message: num === 1 ?
                        `The tweet id = ${ id } has been successfully deleted.` :
                        `The tweet id = ${ id } maybe already deleted or maybe not exists.`
                    });
            }
        )
        .catch(error => res.status(400).send(error));
}

exports.update = async(req, res) => {
    const id = req.params.tweetId;

    return await Tweet.update(req.body, 
                                { where : { id : id }})
                    .then(
                        (num) => {
                            return res.status(num[0] === 1 ? 201: 400)
                                    .send({
                                        id : id,
                                        message: num[0] === 1 ? 
                                            `The tweet id = ${ id } has been successfully updated.`:
                                            `The tweet id = ${ id } maybe deleted or maybe not exists.`
                                    });
                        }
                    )
                    .catch(error => res.status(400).send(error));
}

exports.likeTweet = async (res, req) => {
    const { tweetId } = req.params.tweetId;

    return res.status(201).json({
        tweetId: tweetId,
        userId: req.body.userId
    })
}