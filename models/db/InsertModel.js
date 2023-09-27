var oracledb = require("oracledb");
const dbConfig = require('../../config/db/dbconfig.js'); 

'use strict';
Error.stackTraceLimit = 50;


const InsertMode = {

  async insertdb(req, res, sql, value, options) {
    let connection;
    try {

      connection = await oracledb.getConnection();
      return new Promise(async (resolve, reject) => {
        result = await connection.execute(
          sql, value, options // Bind values must be type of array or object 
        );

        if (result.rowsAffected === 1) {
          resolve(true); //
        } else {
          reject(false); //
        }
      });

    } catch (err) {
      return res.status(403 || 500).json({ "success": false, "txt": err.message });
    } finally {
      if (connection) {
        try {
          conn = true;
          // Always close connections
          await connection.close();
        } catch (err) {
          return res.status(403).json({ "success": false, "txt": err.message });
        }
      }
    }
  },/// return promise or throw exception

  async insertMulti(req, res, sql, values) {

    // const sql = "INSERT INTO no_em_tab values (:a, :b, :c,sysdate)";

    const binds = [
      { a: 1, b: "Test 1 (One)", c: "Test13444444444444ef" },
      { a: 2, b: "Test 2 (two)", c: "Test2" },
      { a: 3, b: "Test 3 (three)", c: "Test3" },
    ];


    // bindDefs is optional for IN binds but it is generally recommended.
    // Without it the data must be scanned to find sizes and types.
    const options = {
      autoCommit: true,
      bindDefs: {
        a: { dir: oracledb.BIND_INOUT, type: oracledb.NUMBER },
        b: { dir: oracledb.BIND_INOUT, type: oracledb.STRING, maxSize: 15 },
        c: { dir: oracledb.BIND_INOUT, type: oracledb.STRING, maxSize: 15 }
      }
    };

    let connection;

    try {

      const { STUDY_YEAR, STUDY_SEMESTER, FISCAL_YEAR } = req.body;

      connection = await oracledb.getConnection(dbConfig);

      const result = await connection.executeMany(sql, binds, options);
      console.log("Result is:", result);


      return res.status(200).json({ "successs": true, "txt": 'insert' });
    } catch (err) {
      return res.status(err.status || 500).json({ "success": false, "txt": err.message });
    } finally {
      if (connection) {
        try {
          conn = true;
          // Always close connections
          await connection.close();
        } catch (err) {
          return res.status(err).json({ "success": false, "txt": err.message });
          // return console.error(err.message);
        }
      }
    }
  }
}

module.exports = InsertMode;