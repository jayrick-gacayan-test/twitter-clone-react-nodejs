module.exports = app => {
    require( "./auth_route" )( app ); // route for auth
    require( "./tweet_route" )( app ); // route for tweet
    require( "./user_route" )( app ); // route for user
    require( "./file_route")( app ); // route for file
};