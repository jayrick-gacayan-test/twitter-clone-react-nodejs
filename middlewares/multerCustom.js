const multer = require("multer");
const path = require("path");

const multerCustom = (pathFolder, inputNameFile) => {
    let storage = multer.diskStorage({
        destination: (req, file, cb) => { 
            cb(null, path.join(__dirname , '../client/src/storage/images/', pathFolder));
        },
        filename: (req, file, cb) => {
            cb(null, 
                pathFolder + "-" + Date.now() + 
                    req.body.text + path.extname(file.originalname)
            );
        }
    })

    return multer({ storage: storage }).single(inputNameFile);
}

module.exports = {
    multerCustom : multerCustom
}
