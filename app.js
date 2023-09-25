
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
var corsOptions = { origin: "*", credentials: true };
app.use(cors(corsOptions));

require("dotenv").config();

const routes = require("./routers/routes");


app.get('/', (req, res) => {

    //console.log(TOKEN_SECRET);
    res.status(200).json({ messege: 'Api oracle v1.' });
});

app.post('/tt', function(req, res){
    console.dir(req.body);
    res.send("test");
}); 

app.use('/api', routes);

app.listen(process.env.PORT, () => {
    console.log("listening on port..: " + process.env.PORT);
});