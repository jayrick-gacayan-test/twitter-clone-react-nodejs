module.exports = app => {
    require( "./auth_route" )( app );
    require( "./tweet_route" )( app );
    require( "./user_route" )( app );
};