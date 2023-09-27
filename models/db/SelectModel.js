

const pool = require('../../config/db/dbconfigpool');
var oracledb = require("oracledb");
require('dotenv').config();

class Model {
   // db = pool.pool; // only one for fn
    static async findAll(res, sql, value, options) {
        let connection;
        try {
            if (!sql) {
                throw new Error("SQL must be provided")
            }
            
            connection = await oracledb.getConnection();
            return new Promise(async (resolve, reject) => {
                const result = await connection.execute(sql, value, options);

                if (result.rows.length === 0) {
                    reject(result);
                } else {
                    //console.log(result.rows);
                    resolve(result);
                }
            });/// return next
        } catch (err) {
            return res.status(403 || 500).json({ "success": false, "txt": err.message });
        } finally {
            if (connection) {
                try {
                    await connection.close(); // Put the connection back in the pool
                } catch (err) {
                    //throw (err);
                    return res.status(403 || 500).json({ "success": false, "txt": err.message });
                }
            }

            // await oracledb.getPool().close(10);
            //console.log('Pool closed');
            // process.exit(0);
        }
    }

}

//Model.process.once('SIGTERM', closePoolAndExit).once('SIGINT', closePoolAndExit);

module.exports = Model 