const emailController = require("../controllers").email;
const router = require("express").Router();

module.exports = (app) => {
    app.use("/api/email", router);

    router.get('/send', emailController.sendEmail);
};