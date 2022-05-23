/* controllers */
const auth = require("./authController");
const users = require("./usersController");
const tweets = require("./tweetsController");

module.exports = {
    auth,
    tweets,
    users
}