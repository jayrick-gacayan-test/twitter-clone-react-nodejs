/* controllers */
const auth = require("./authController");
const users = require("./usersController");
const tweets = require("./tweetsController");
const files = require("./filesController");
const email = require("./emailController");

module.exports = {
    auth,
    tweets,
    users,
    files,
    email
}