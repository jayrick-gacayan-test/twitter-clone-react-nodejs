const path = require("path");
const fs = require("fs");
const db = require("../models");
const User = db.User;


exports.upload = (req, res) =>{
    //const userImagePath = path.join(__dirname , '../client/src/storage/images/', 'profile');
    //const formData = multer().single('user_image');

    /* formData(req, res, (error) => {
        if(error instanceof multer.MulterError)
            return res.status(500).json(error)
        else if(error) return res.status(500).json(error);
        
        return res.status(201).json(req.file);
    }); */

    return res.status(200).json(req.file);
    /* const storage = multer.diskStorage({
        destination: (req, file, cb) => { 
            cb(null, path.join(__dirname , '../client/src/storage/images/', 'profile'));
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + file.originalname);
        }
    });

    const upload = multer({storage: storage}).single('file');

    upload(req, res, (error) => {
        if(error instanceof multer.MulterError)
            return res.status(500).json(error)
        else if(error) return res.status(500).json(error);
    }); */

}