const fs = require("fs");
const path = require("path");

function checkUploadPath (pathFolder) {
    return (res, req, next) => {
        const strPath = path.join(__dirname , '../client/src/storage/images/', pathFolder);
        
        // checks if the folder path folder exists.
        if(fs.existsSync(strPath)) 
            console.log("Folder path has been already exists.");
        else
            fs.mkdir(strPath,
                { recursive: true },
                (error) => {
                    if(error)
                        console.log("Error in folder creation maybe the folder exist.");
            });// creating path folder if the path do not exists.
        
        next();
    }   
}

module.exports = {
    checkUploadPath : checkUploadPath
}