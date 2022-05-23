require( "dotenv" ).config();

const {  
         DEV_DATABASE_HOST, 
         DEV_DATABASE_USERNAME, 
         DEV_DATABASE_PASSWORD,
         AUTH_SECRET
      } = process.env;

module.exports = {
  development: {
     username: DEV_DATABASE_USERNAME,
     password: DEV_DATABASE_PASSWORD,
     database: "twitter_clone_react_node_dev",
     host: DEV_DATABASE_HOST,
     dialect: "postgres"
  },
  test: {
     username: "root",
     password: null,
     database: "twitter_clone_test",
     host: "127.0.0.1",
     dialect: "postgres"
  },
  production: {
     username: "root",
     password: null,
     database: "twitter_clone_prod",
     host: "127.0.0.1",
     dialect: "postgres"
  },
  jwt_auth: {
   secret: AUTH_SECRET,

   /* for test */
   jwtExpiration: "2h",          // 1 minute
   jwtRefreshExpiration: "4h",  // 2 minutes
   //jwtExpiration: 3600, // 1 hour
   //jwtRefreshExpiration: 86400, //24 hours
  }
  
}
