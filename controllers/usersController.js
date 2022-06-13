/* models */
const database = require("../models");
const User = database.User;
const Tweet = database.Tweet;
const Follow = database.Follow;

const Op = database.Sequelize.Op;
const path = require("path");

exports.show = (req, res) => {
    return User.findByPk(req.params.userId,
                {
                    include: [
                        {
                            model: Tweet,
                            as: "tweets"
                        }
                    ]
                }
            )
            .then(
                (user) => {
                    if(!user) return res.status(404).send({ error: "User not found"});
                    
                    return res.status(200).send(user);
                }
            )
            .catch(error => res.status(400).send(error));
}

exports.showAll = (req, res) => {
    
    const queryEmail = req.query.email;

    const userEmailCondition = queryEmail ? 
                {
                    where: {
                        email: { 
                            [Op.iLike] : `%${ queryEmail }%`
                        }
                    }
                } : 
                {};

    return User.findAll(
                            {
                                ...userEmailCondition,
                                include: [
                                    {
                                        model: Follow,
                                        as: "followers"
                                    },
                                    {
                                        model: Follow,
                                        as: "followings"
                                    },
                                ]
                            }
                        )
                        .then(
                            (users) => {
                                if(!users) return res.status(404).send({ error: "You do not have any tweets." });

                                return res.status(200).send(users);
                            }
                        )
                        .catch(error => res.status(400).send(error));
}

exports.update = async (req, res) => {
    const fs = require("fs");
    const id = req.params.userId;
    let userImageName = null;

    console.log("Request body --- ", req.body);
    
    if(req.files && req.files.userImage)
    {
        const userImage = req.files.userImage;
        const userImagepath = path.join(__dirname, '../storage/images', "profile");
        
        userImageName = Date.now() + "_" + id + path.extname(userImage.name);
        const toUpdateUser = await User.findByPk(id);

        if(toUpdateUser.userImage !== "defaultImage.png")
            fs.unlinkSync(userImagepath + "/" + toUpdateUser.userImage);

        userImage.mv(userImagepath + "/" + userImageName, 
            (error) => {
                if(error) return res.status(403).json(error);
            }
        );
 
    }

    const userName = {
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }

    const userUpdateField = userImageName ? {
        ...userName,
        userImage: userImageName
    }: userName;

    return await User.update(userUpdateField, 
                                { where : { id : id }})
                    .then(
                        (num) => {
                            return res.status(num[0] === 1 ? 201: 400)
                                .send({
                                    id: id,
                                    message: num[0] === 1 ?
                                    `The user id = ${ id } has been successfully updated.` :
                                    `The user id = ${ id } maybe deleted or maybe not exists.`
                                });
                        }
                    )
                    .catch((error) => { return res.status(400).send(error); }); 
}

exports.follow = async (req, res) => {
    const followingId = req.params.followingId;
    const userId = req.body.userId;

    const updateFollowWhereClause = { 
                                        where: {
                                            [Op.and] : [
                                                { follower: userId },
                                                { following: followingId }
                                            ]
                                        }
                                    };

    if(followingId === userId) return res.status(400).send({ error: "You cannot follow your own account."});
    
    return await Follow.findOne(updateFollowWhereClause)
                        .then(
                            async (userFollow) => {
                                if(!userFollow){
                                    return await Follow.create(
                                                            {
                                                                isFollowed: true,
                                                                follower: userId,
                                                                following: followingId
                                                            }
                                                        )
                                                        .then(
                                                            (newUserFollow) => { return res.status(200).send(newUserFollow); }
                                                        )
                                                        .catch((error) => { return res.status(403).send(error); });
                                }
                                else{
                                    return await userFollow.update(
                                                            { isFollowed: !userFollow.isFollowed },
                                                            updateFollowWhereClause)
                                                        .then(() => { return res.status(201).send(userFollow); })
                                                        .catch((error) => { return res.status(400).send(error); });
                                }
                            }
                        )//checks if there is a follow on the where clause.
                        .catch((error) => { return res.status(400).send(error); })
}