var oracledb = require("oracledb");
require('dotenv').config();
/*
//@ use theme for pool connections can't work
const dbConfig = require('../../config/db/dbconfig'); 
*/
const UpdateModel = {
    async updatedb( res, sql, value, options) {
        let connection;
        try {

            connection = await oracledb.getConnection(); // get connection from pool cache
            //connection = await oracledb.getConnection(dbConfig); //=>  get standalone connection 
            return new Promise(async (resolve, reject) => {
                const result = await connection.execute(
                    sql, value, options
                );

                if (result.rowsAffected == 1) {
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
                    return res.status(403 || 500).json({ "success": false, "txt": err.message });
                }
            }
        }
    }
}
module.exports = UpdateModel;