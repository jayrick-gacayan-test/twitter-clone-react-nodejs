const router = require("express").Router();
const filesController = require("../controllers").files;

module.exports = (app) => {
    app.use('/files', router);

    // customized like for getting the file including images
    router.get("/:folderName/:fileName",
        filesController.getFile);
}