var oracledb = require("oracledb");
const dbConfig = require('../config/db/dbconfig.js');
const express = require("express");
const app = express();
app.use(express.json());


'use strict';

Error.stackTraceLimit = 50;

async function selectParams(req, res) {
    let connection;
    let result;

    try {
        const STUDY_YEAR = 2566;
        const STUDY_SEMESTER = 1;
        const FISCAL_YEAR = 2566;
        console.log(req.params.STUDY_YEAR, ' ', STUDY_SEMESTER, ' ', FISCAL_YEAR);

        connection = await oracledb.getConnection(dbConfig);
        //console.log('Connection was successful!');

        // run query to get data with table name
        const sql = `SELECT FISCAL_YEAR,STUDY_YEAR,STUDY_SEMESTER,COUNTER_NO,
        to_char(START_DATE,'dd/mm/yyyy','NLS_CALENDAR=''THAI BUDDHA'' NLS_DATE_LANGUAGE=THAI')START_DATE,
        to_char(END_DATE,'dd/mm/yyyy','NLS_CALENDAR=''THAI BUDDHA'' NLS_DATE_LANGUAGE=THAI')END_DATE,
        START_TIME,END_TIME,MESSAGE_SHOW,DUE_DATE,
        to_char(UPDATE_DATE,'dd/mm/yyyy','NLS_CALENDAR=''THAI BUDDHA'' NLS_DATE_LANGUAGE=THAI')UPDATE_DATE,
        TYPE_COUNTER,SYS_STATUS,SYS_CLOSE
        FROM ET_COUNTER_ADMIN  where STUDY_YEAR=:1 and STUDY_SEMESTER=:2 and FISCAL_YEAR=:3  `

        result = await connection.execute(
            sql, [STUDY_YEAR, STUDY_SEMESTER, FISCAL_YEAR],
            { 
                maxRows: 1,
                outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format
                // , fetchArraySize: 100                    // internal buffer allocation size for tuning
            } 
        );

        if (result.rows.length == 0) {
            //query return zero 
            //return res.send("query send no rows");
            return res.status(200).json({ "success": false, "txt": 'query send no rows' });
        } else {
            //send all 
            //  const newEtCounter = new etCounter(result.rows)
            const data = result.rows
            return res.status(200).json({ "success": true, data });
        } 

    } catch (err) {
        //send error message 
        return res.status(err.status || 500).json({ "success": false, "txt": err.message });
    } finally {
        if (connection) {
            try {
                conn = true;
                // Always close connections
                await connection.close();
            } catch (err) {
                //return console.error(err.message);
                return res.status(err.status || 500).json({ "success": false, "txt": err.message });
            }
        }
    }
}


module.exports = { selectParams };