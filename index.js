require('dotenv').config();
const express = require("express");
const cors = require("cors");
const expressFileUpload = require("express-fileupload");
const app = express();

const PORT = process.env.PORT || 5001;
const ORIGIN_PORT = process.env.ORIGIN_PORT;

let corsOption = {
    origin: `http://localhost:${ ORIGIN_PORT }`
}

app.use(cors(corsOption));

// for headers Content-Type: application/json
app.use(express.json());

// for headers Content-Type: application/x-www-form-urlencoded
app.use(
    express.urlencoded({
        extended: true
    })
);

// for headers Content Type: multipart/form-data
app.use(
    expressFileUpload({ createParentPath: true })
);

/* routes */
require("./routes")(app);

app.listen(PORT,
    () => {
        console.log(`Server listening on PORT ${ PORT }`);
    }
);