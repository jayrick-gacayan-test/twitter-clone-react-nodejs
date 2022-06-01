const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require('../config/config');

/* models */
const User = require("../models").User;

const errorBreakdown = (errors) => {
    const errObj = {};

    errors.map(
        (error) => {
            if(error.path in errObj)
                errObj[error.path] = [...errObj[error.path], error.message ];
            else
                errObj[error.path] = [ error.message ];
        }
    );

    return errObj;
}

exports.register = async (req, res) => {
    const { email, password, cfpswd } = req.body;

    let user = null;
    let hasEmail = null;
    try{
        user = await User.build({ email, password, cfpswd });
        
        hasEmail = await user.hasEmail(); // checks if email exists.
        let validateUser = await user.validate(
                            { 
                                fields: ["email", "password", "cfpswd"]
                            });//validating fields
    
    }catch(err){
        let errObj = {};

        if(err.name === 'SequelizeValidationError')
            errObj = errorBreakdown(err.errors);

        if(hasEmail !== null) errObj["email"] = [ hasEmail ];
        
        for(let props in errObj){
            if(errObj.hasOwnProperty(props))
                return res.status(400).json({ error: errObj });
        }
        return res.status(500).json(err);
    }
    
    if(hasEmail !== null)
        return res.status(401).json({ error: { email: "Email has been already taken."}});
    
    // inserting data
    await user.save();
    return res.status(200).json({ email: user.email, message: "Your account has been registered successfully." });    
};

exports.logIn = async (req, res) => {
    const { email, password } = req.body;

    let user = null;
    const logInError = { accessToken : null, error: "Invalid username or password." };
    
    try{
        user = await User.build({ email, password });
        let validateUser = await user.validate(
                                { 
                                    fields: ["email", "password"], 
                                    skip: ["cfpswd"]
                                }); // validating fields
    }
    catch(err){
        let errObj = {};

        if(err.name === 'SequelizeValidationError'){
            errObj = errorBreakdown(err.errors);
            return res.status(400).json({error: errObj});
        }

        return res.status(500).json(err);
    }
    
    return await User.findOne({ where: { email: email }})
        .then(
            (user) => {
                if(!user) 
                    return res.status(401).send({ ...logInError, error: "User may be deleted or maybe not exists"});
                
                const validPassword = bcrypt.compareSync(password, user.password);
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
                    message : "Your account login successfully."
                });
            }
        );
}