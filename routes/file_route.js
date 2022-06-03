const router = require("express").Router();
const filesController = require("../controllers").files;

module.exports = (app) => {
    app.use('/files', router);

    router.get("/:folderName/:fileName",
        filesController.getFile);
}