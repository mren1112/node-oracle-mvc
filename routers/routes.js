var express = require('express');
const app = express(); 
const bodyParser = require("body-parser"); 

app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); 

const router = express.Router()

// -------------------------------------
const test = require('../controllers/test'); 
const selectdb = require('../controllers/db/selectdb'); 
//--------------------------------------

// ----- test --------------------------------

router.get('/test', test.selectParams);
router.get('/select', selectdb.getSelect.getSelectdb);
//----------------------------------------------------------------

// verify token 
//router.get('/verify', bodyParser,getAccessToken.verifyAccessToken,);

// getting routes 
//router.post('/getusers', bodyParser,getAccessToken.generateAccessToken);

module.exports = router;