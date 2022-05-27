const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require('../config/config');
const database = require('../models');


/* models */
const User = database.User;

exports.register = (req, res) => {
    const { email, password, cfpswd } = req.body;
    
    return User.create({
        email,
        password,
        cfpswd
    })
    .then(
        (newUser) => {
            const user = { newUser, message: "User registered successfully." };
            return res.status(201).send(user);
        }
    )
    .catch(
        (error) => { 
            if(error.name === 'SequelizeValidationError'){
                const errObj = {};
                error.errors.map((error) => {
                    
                    if(error.path in errObj)
                        errObj[error.path] = [...errObj[error.path], error.message ];
                    else
                        errObj[error.path] = [ error.message ];
                });

               return res.status(400).send({ error: errObj});
            }
            return res.status(500).send(error);
        }
    );
};

exports.logIn = (req, res) => {
    const { email, password } = req.body;

    const logInError = { accessToken : null, error: "Invalid username or password." };
    
    const userBuild = User.build({ email, password });

    console.log(" --- ", userBuild.getPassword("1"));

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
                
                const { id, email, firstName, lastName } = user;

                return res.status(200).send({
                    id, 
                    email,
                    firstName,
                    lastName,
                    accessToken: token,
                    message : "User successfully login."
                });
            }
        )
        .catch(
            (error) => { 
                if(error.name === 'SequelizeValidationError'){
                    const errObj = {};
                    error.errors.map((error) => {
                        
                        if(error.path in errObj)
                            errObj[error.path] = [...errObj[error.path], error.message ];
                        else
                            errObj[error.path] = [ error.message ];
                    });
    
                   return res.status(400).send({ error: errObj});
                }
                return res.status(500).send(error);
            }
        );
}