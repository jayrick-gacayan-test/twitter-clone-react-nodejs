const multer = require("multer");
const path = require("path");
const fs = require('fs');
const userImagePath = path.join(__dirname , '../client/src/storage/images/', 'profile');


exports.upload = (req, res) =>{
    console.log("Request ---- ", req.body);
    console.log("Request ---- ", userImagePath);
    console.log("Exist file --- ", fs.existsSync(userImagePath));

    return res.status(201).json(req.body);
    /* fs.access(userImagePath,(error) => {
        if(error)
        {
            fs.mkdir(userImagePath, 
                (err) => {
                    if(err) return res.status(501).json(err);
                }
            );
        }
    }); */

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