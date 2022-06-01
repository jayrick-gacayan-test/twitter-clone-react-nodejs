/* controllers */
const auth = require("./authController");
const users = require("./usersController");
const tweets = require("./tweetsController");
const uploads = require("./uploadsController");

module.exports = {
    auth,
    tweets,
    users,
    uploads
}