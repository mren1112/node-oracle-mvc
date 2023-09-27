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
const auth_sign = require('../controllers/auth/auth_sign');
const SelectDataController = require('../controllers/SelectModel');
const InsertDataController = require('../controllers/InsertModel');
const UpdateDataController = require('../controllers/UpdateModel');
const DeleteDataController = require('../controllers/DeleteModel');
//--------------------------------------
// ------------ authentication --------------------
router.post('/sign', auth_sign.authenticateSignToken.sign_mid);
router.post('/verify', auth_sign.authenticateSignToken.verify_mid);
router.get('/select', auth_sign.authenticateSignToken.verify_mid, selectdb.getSelect.getSelectdb);
router.get('/selectp', selectdb.getSelect.getSelectdb);
//------------------------------------------------- 

// ----- test model --------------------------------
router.post('/insertdb', InsertDataController.insertdb);
router.put('/updatedb', UpdateDataController.updatedb);
router.delete('/deletedb', DeleteDataController.deletedb);
 
router.get('/testpool', SelectDataController.getSelectdb);
//----------------------------------------------------------------

// verify token 
//router.get('/verify', bodyParser,getAccessToken.verifyAccessToken,);

// getting routes 
//router.post('/getusers', bodyParser,getAccessToken.generateAccessToken);

module.exports = router;