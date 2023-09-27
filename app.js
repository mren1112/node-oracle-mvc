
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require('helmet');
const cors = require("cors");

var app = express();
//app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

'use strict';
Error.stackTraceLimit = 50;

//enable cros 
//app.use(cors({ origin: ["http://localhost:3000"], credentials: true }))
app.use(helmet());
var corsOptions = { origin: "POST GET PUT", credentials: true };
app.use(cors(corsOptions));

require("dotenv").config();
const controllPool = require("./controllers/db/ControllPool");
var initpool = controllPool.initPool;

const routeControll = require("./routers/routesControl");
const routes = require("./routers/routes");

async function callInit() {
    return initpool;
}
callInit();

app.get('/', (req, res) => {

    //console.log(TOKEN_SECRET);
    res.status(200).json({ messege: 'Api oracle v1.' });
});

app.post('/tt', function (req, res) {
    console.dir(req.body);
    res.send("test");
});


app.use('/api/doc', routes);

app.use('/api', routeControll);

app.use('/api', routes);

app.listen(process.env.PORT, () => {
    console.log("listening on port..: " + process.env.PORT);
});