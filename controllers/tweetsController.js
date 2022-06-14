/* models */
const database = require('../models');

const Tweet = database.Tweet;
const User = database.User;
const Like = database.Like;
const Comment = database.Comment;

const Op = database.Sequelize.Op;

exports.show = (req, res) => {
    return Tweet.findByPk(req.params.tweetId,
                                {
                                    include: [
                                        {
                                            model: database.User,
                                            as: 'user',
                                            attributes: ["id", "email", "firstName", "lastName", "userImage"]
                                        },
                                        {
                                            model: database.Like,
                                            as: 'likes'
                                        },
                                        {
                                            model: database.Comment,
                                            as: "comments",
                                            include: [
                                                {
                                                    model: database.User,
                                                    as: "commenter",
                                                    attributes: ["id", "email", "firstName", "lastName", "userImage"]
                                                }
                                            ]
                                        }
                                    ],
                                    order: [
                                        [ "createdAt", "DESC" ], // model Tweet
                                        [
                                            { 
                                                model: database.Comment,
                                                as: "comments"
                                            }, 
                                            'createdAt', 
                                            'DESC'
                                        ], // for the model comment
                                    ] 
                                }
                            )
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
    const userInclude = {
        model: User,
        as: "user",
        attributes: [ "email", "firstName", "lastName", "userImage" ]
    }

    const tweetCondition = userId ? {
        ...userInclude, 
        where: { id: userId }
    }: userInclude;

    return Tweet.findAll({
                            include: [ 
                                        tweetCondition, 
                                        { 
                                            model: database.Like, 
                                            as: "likes",
                                        },
                                        {
                                            model: database.Comment,
                                            as: "comments",
                                            include: [
                                                {
                                                    model: database.User,
                                                    as: "commenter",
                                                    attributes: ["id", "email", "firstName", "lastName", "userImage"]
                                                }
                                            ]
                                        }
                                    ],
                            order: [
                                [ "createdAt", "DESC" ], // model Tweet
                                [
                                    { 
                                        model: database.Comment,
                                        as: "comments"
                                    }, 
                                    'createdAt', 
                                    'DESC'
                                ], // for the model comment
                            ] 
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
        .then(
            async (newTweet) => { 
                return await Tweet.findByPk(newTweet.id, 
                                        {
                                            include: [
                                                {
                                                    model: database.User,
                                                    as: 'user',
                                                },
                                                {
                                                    model: database.Like,
                                                    as: 'likes'
                                                },
                                                {
                                                    model: database.Comment,
                                                    as: "comments"
                                                }
                                            ]
                                        }
                                    );
            }
        )
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
    const { title, content } = req.body;
    
    return await Tweet.update({ title, content }, 
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
                    .catch((error) => { return res.status(400).send(error); });
}

exports.likeTweet = async (req, res) => {
    
    const tweetId = req.params.tweetId;
    const userId = req.body.userId;

    const tweet = await Tweet.findByPk(tweetId);

    const updateLikeWhereClause = { 
                                    where: {
                                        [Op.and] : [
                                            { tweetId: tweetId },
                                            { userId: userId }
                                        ]
                                    }
                                };
    
    if(tweet.userId === parseInt(userId))
        return res.status(400).json({ error:  "You cannot like your own tweet." });
    
    return await Like.findOne(updateLikeWhereClause)
                        .then(
                            async (tweetLike) => {
                                if(!tweetLike)
                                    return await Like.create({ isLiked: true, tweetId, userId})
                                                    .then((likeTweet) => { return res.status(200).send(likeTweet); })
                                                    .catch((error) => res.status(400).send(error));
                                else{
                                    return await tweetLike.update({ isLiked: !tweetLike.isLiked },
                                                                updateLikeWhereClause)
                                                        .then(() => { return res.status(201).json(tweetLike); })
                                                        .catch((error) => { return res.status(400).json(error) });
                                }
                            }
                        )// checks if there is a like tweet from a specific user;
                        .catch((error) => { return res.status(400).send(error) });
}

exports.commentTweet = async (req, res) => {
    const tweetId = req.params.tweetId;
    const { text, userId } = req.body;
    
    return await Comment.create({ text, tweetId, userId })
                        .then((newComment) => { return res.status(200).send(newComment); })
                        .catch((error) => { return res.status(400).send(error); });
}