const { verifyEmail } = require( "../middlewares" );
const authController = require( "../controllers" ).auth;
module.exports = app => {
  // Headers //
  app.use( ( request, response, next ) => {
    response.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  } );
  // Routes //
  app.post( "/api/user/register",  
            authController.register);
  app.post( "/api/user/login", authController.logIn );
};