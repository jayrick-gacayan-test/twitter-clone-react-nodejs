require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path")
const app = express();

const PORT = process.env.PORT || 5001;
const ORIGIN_PORT = process.env.ORIGIN_PORT;

let corsOption = {
    origin: `http://localhost:${ ORIGIN_PORT }`
}

app.use(cors(corsOption));

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);

/* routes */
require("./routes")(app);

app.listen(PORT,
    () => {
        console.log(`Server listening on PORT ${ PORT }`);
    }
);