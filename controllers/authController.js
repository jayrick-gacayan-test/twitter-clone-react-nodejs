const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const database = require('../models');
const config = require('../config/config');

/* models */
const User = database.User;

exports.register = (req, res) => {
    const { email, password } = req.body;

    return User.create({
        email,
        password: bcrypt.hashSync(password, 10)
    })
    .then(
        (newUser) => {
            const user = { newUser, message: "User registered successfully." };
            return res.status(201).send(user);
        }
    ).catch(error => res.status(500).send(error));
};

exports.logIn = (req, res) => {
    const { email, password } = req.body;

    console.log("Email, Password --- ", email, password);
    const logInError = { accessToken : null, error: "Invalid username or password." };

    return User.findOne({ where: { email: email }})
        .then(
            (user) => {
                console.log("User --- ", user);
                const validPassword = bcrypt.compareSync(password, user.password);

                if(!user) 
                    return res.status(401).send({ ...logInError, error: "User may be deleted or maybe not exists"});
                
                if(!validPassword)
                    return res.status(401).send(logInError);
                
                const token = jwt.sign({ id: user.id },
                                    config.jwt_auth.secret,
                                    { expiresIn : config.jwt_auth.jwtExpiration });
                
                const { id, email } = user;

                return res.status(200).send({
                    id, 
                    email, 
                    accessToken: token,
                    message : "User successfully login."
                });
            }
        )
        .catch(error => res.status(500).send(error));
}