/* controllers */
const auth = require("./authController");
const users = require("./usersController");
const tweets = require("./tweetsController");
const files = require("./filesController");

module.exports = {
    auth,
    tweets,
    users,
    files
}