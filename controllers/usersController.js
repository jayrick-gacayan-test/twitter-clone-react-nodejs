/* models */
const User = require("../models").User;

exports.show = (req, res) => {
    return User.findByPk(req.params.userId, {})
        .then(
            (user) => {
                if(!user) return res.status(404).send({ error: "User not found"});
                
                return res.status(200).send(user);
            }
        )
        .catch(error => res.status(400).send(error));
}

exports.showAll = (req, res) => {
    
    return User.findAll()
        .then(
            (users) => {
                if(!users) return res.status(404).send({ error: "You do not have any tweets." });

                return res.status(200).send(users);
            }
        )
        .catch(error => res.status(400).send(error));
}

exports.update = async(req, res) => {
    const id = req.params.userId;
    
    return await User.update(req.body, 
                                { where : { id : id }})
                    .then(
                        (num) => {
                            return res.status(num[0] === 1 ? 201: 400)
                                .send({
                                    id: id,
                                    message: num[0] === 1 ?
                                    `The user id = ${ id } has been successfully updated.` :
                                    `The user id = ${ id } maybe deleted or maybe not exists.`
                                })
                        }
                    );
}