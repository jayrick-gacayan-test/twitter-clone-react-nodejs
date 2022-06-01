const uploadsController = require("../controllers").uploads;
const router = require("express").Router();

module.exports = app => {

    
    app.use("/api/files", router);

    router.post("/upload",
        uploadsController.upload
    );
    
}