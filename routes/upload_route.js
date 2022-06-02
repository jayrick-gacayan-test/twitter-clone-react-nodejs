const express = require("express");
const path = require("path");
const router = express.Router({
    mergeParams: true
});

const uploadsController = require("../controllers").uploads;
const { checkUploadPath, multerCustom } = require("../middlewares");


module.exports = app => {
    app.use('/storage/images/profile',
        express.static(
            path.join(__dirname, '../client/src/storage/images', "profile")
        )
    );

    app.use("/api/files", router);

    router.post("/upload",
        [ checkUploadPath.checkUploadPath("profile"), 
          multerCustom.multerCustom("profile", "user_image")],
        uploadsController.upload
    );
    
}