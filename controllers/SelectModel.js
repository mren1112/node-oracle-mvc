
require('dotenv').config();

const Model = require('../models/db/SelectModel')
const DataController = {
    getData: (req, res) => {

        // res.json(getpool.testpool());
    },

    async getSelectdb(req, res) {

        if (!req) {
            throw new Error("Unauthorized Access")
        }

        // const { STUDY_SEMESTER } = req.body;
        let data = [];

        let sql = `SELECT FISCAL_YEAR,STUDY_YEAR,STUDY_SEMESTER,COUNTER_NO,
        to_char(START_DATE,'dd/mm/yyyy','NLS_CALENDAR=''THAI BUDDHA'' NLS_DATE_LANGUAGE=THAI')START_DATE,
        to_char(END_DATE,'dd/mm/yyyy','NLS_CALENDAR=''THAI BUDDHA'' NLS_DATE_LANGUAGE=THAI')END_DATE,
        START_TIME,END_TIME,MESSAGE_SHOW,DUE_DATE,
        to_char(UPDATE_DATE,'dd/mm/yyyy','NLS_CALENDAR=''THAI BUDDHA'' NLS_DATE_LANGUAGE=THAI')UPDATE_DATE,
        TYPE_COUNTER,SYS_STATUS,SYS_CLOSE
        FROM ET_COUNTER_ADMIN  `;

        const options = {
            outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format 
            //, maxRows: 1                             // query limit rows
            //, outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format
            //, fetchArraySize: 100                    // internal buffer allocation size for tuning
        };

        const results = await Model.findAll(res, sql, data, options);
        if (results.length == 0) {
            //query return zero  
            return res.status(200).json({ "success": false, "message": 'query no row' });
        } else {
            //query return data     
            //console.log("Query metadata:", result.metaData);
            //console.log("Query rows:", result.rows);
            /*for (const row of result.rows) {
                console.log('Object id', row.ID);
                const g = row.GEOMETRY;                         // a DbObject for the named Oracle type
                console.log('Geometry is', g);                  // the whole object
                console.log('Ordinates are', g.SDO_ORDINATES);  // can access attributes
                console.log('JSON', JSON.stringify(g));         // Objects can be stringified
              }*/
            const data = results.rows;
            return res.status(200).json({ "success": true, data });
        }
    },

    async getSelectBy(req, res) {

        if (!req) {
            throw new Error("Unauthorized Access")
        }

        const { STUDY_SEMESTER, STUDY_YEAR } = req.body;
        let data = [STUDY_SEMESTER, STUDY_YEAR];
        //let data = {v1: STUDY_SEMESTER, v2: STUDY_YEAR};

        const options = {
            outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format 
        };

        let sql = `SELECT FISCAL_YEAR,STUDY_YEAR,STUDY_SEMESTER,COUNTER_NO,
        to_char(START_DATE,'dd/mm/yyyy','NLS_CALENDAR=''THAI BUDDHA'' NLS_DATE_LANGUAGE=THAI')START_DATE,
        to_char(END_DATE,'dd/mm/yyyy','NLS_CALENDAR=''THAI BUDDHA'' NLS_DATE_LANGUAGE=THAI')END_DATE,
        START_TIME,END_TIME,MESSAGE_SHOW,DUE_DATE,
        to_char(UPDATE_DATE,'dd/mm/yyyy','NLS_CALENDAR=''THAI BUDDHA'' NLS_DATE_LANGUAGE=THAI')UPDATE_DATE,
        TYPE_COUNTER,SYS_STATUS,SYS_CLOSE
        FROM ET_COUNTER_ADMIN WHERE STUDY_SEMESTER=:1 and STUDY_YEAR=:2 `;
        //FROM ET_COUNTER_ADMIN WHERE STUDY_SEMESTER=:v1 and STUDY_YEAR=:v2 `;

        const results = await Model.findAll(res, sql, data, options);
        if (results.length == 0) {
            //query return zero  
            return res.status(200).json({ "success": false, "message": 'query no row' });
        } else {
            //query return data    
            //console.log("Query metadata:", result.metaData);
            //console.log("Query rows:", result.rows);
            const data = results.rows;
            return res.status(200).json({ "success": true, data });
        }
    }
}

module.exports = DataController