const path = require('path');

exports.getFile = async (req, res) => {
    let filePath = path.join(__dirname, "../storage/images", req.params.folderName);

    res.sendFile(filePath + "/" + req.params.fileName);
}

