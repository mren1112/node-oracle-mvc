var oracledb = require("oracledb");
require('dotenv').config();


const Model = require('../models/db/UpDateModel');

const DataController = {

    async updatedb(req, res) {
        if (!req.body) {
            throw new Error("SQL must be provided");
        }

        const { val, STUDY_YEAR } = req.body;
        const dataSet = {
            id: STUDY_YEAR,
            dt: val
        };

        // bindDefs is optional for IN binds but it is generally recommended.
        // Without it the data must be scanned to find sizes and types.
        const options = {
            autoCommit: true,
            outFormat: oracledb.OBJECT,
            bindDefs: {
                id: STUDY_YEAR,
                dt: { dir: oracledb.BIND_INOUT, type: oracledb.STRING, maxSize: 6 }
            }
        };

        const sql = `update ET_COUNTER_ADMIN_TEST SET DUE_DATE=:dt where STUDY_YEAR=:id `;
        const results = await Model.updatedb(res, sql, dataSet, options);
        if (results) {
            //query return zero  
            return res.status(200).json({ "success": true, "message": 'Update successfully.' });
        } else {
            return res.status(200).json({ "success": false, 'messege': 'Update not successfully.' });
        }

    }
}

module.exports = DataController
