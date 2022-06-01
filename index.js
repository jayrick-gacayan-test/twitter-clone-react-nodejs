require('dotenv').config();
const express = require("express");
const cors = require("cors");
const multer = require('multer');

const upload = multer();
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
app.use(upload.array());


app.get("/api",
    (req, res) => {
        console.log("Test token ---- " ,PORT);
        res.json({
            text : "Test Port --- " + PORT
        });
        
    }
);

app.get("/api/hello",
    (req, res) => {
        console.log("Test token ---- " , req.baseUrl);
        res.json({
            message : "Welcome to react nodejs test"
        });
        
    }
);

/* routes */
require("./routes")(app);

app.listen(PORT,
    () => {
        console.log(`Server listening on PORT ${ PORT }`);
    }
);