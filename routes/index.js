module.exports = app => {
    require( "./auth_route" )( app ); // route for auth
    require( "./tweet_route" )( app ); // route for tweet
    require( "./user_route" )( app ); // route for user
    require( "./email_route" )(app); // route for email
    require( "./file_route")( app ); // route for file
};