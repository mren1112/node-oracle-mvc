
var express = require('express');
const app = express(); 
const bodyParser = require("body-parser"); 

app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const getModelSelect = require('../../models/db/selectdb');

'use strict';
Error.stackTraceLimit = 50;


'use strict';

Error.stackTraceLimit = 50;

/* const arr = {
    FISCAL_YEAR: 2566,
    STUDY_SEMESTER: 1,
    STUDY_YEAR: 2566
} */

class getSelect {
    static async getSelectdb(req, res) {

        const { STUDY_YEAR,STUDY_SEMESTER,FISCAL_YEAR } = req.body;
        console.log(STUDY_YEAR,STUDY_SEMESTER,FISCAL_YEAR);

        let sql = `SELECT FISCAL_YEAR,STUDY_YEAR,STUDY_SEMESTER,COUNTER_NO,
        to_char(START_DATE,'dd/mm/yyyy','NLS_CALENDAR=''THAI BUDDHA'' NLS_DATE_LANGUAGE=THAI')START_DATE,
        to_char(END_DATE,'dd/mm/yyyy','NLS_CALENDAR=''THAI BUDDHA'' NLS_DATE_LANGUAGE=THAI')END_DATE,
        START_TIME,END_TIME,MESSAGE_SHOW,DUE_DATE,
        to_char(UPDATE_DATE,'dd/mm/yyyy','NLS_CALENDAR=''THAI BUDDHA'' NLS_DATE_LANGUAGE=THAI')UPDATE_DATE,
        TYPE_COUNTER,SYS_STATUS,SYS_CLOSE
        FROM ET_COUNTER_ADMIN  `;


        if (sql == null) {
            throw new Error("SQL query is null or invalid");
        }

        const results = await getModelSelect.SelectModel.getSelectDB(req, res, sql);

        //console.log('frfrdrdf',results);
        if (results.length == 0) {
            //query return zero  
            return res.status(200).json({ "success": false, "txt": 'query send no rows' });
        } else {
            //query return data   
            const data = results.rows;
            return res.status(200).json({ "success": true, data });
        }

    }
}




module.exports = { getSelect };