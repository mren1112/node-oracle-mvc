require('dotenv').config();
const jwt = require('jsonwebtoken');
const moment = require('moment');
const Define = require('./Define');
const Response = require('../models/Response/Response');

const Helper = {
    //@get a date after 1 day @return miliseconds
    getExpireDay: (day = 1) => {
        return moment().add(day, Define.DAYS).valueOf();
    },
    //@return token:String
    getJWTtoken: (client_id, ACCESS_SECRET) => {
        if (expires) {
            return jwt.sign({ client_id: client_id }, ACCESS_SECRET, { expiresIn: Define.EXPIRE_TIME });
        } else {
            return jwt.sign({ client_id: client_id }, ACCESS_SECRET.ACCESS_SECRET);
        }
    },
    //@return client_id:String || throw Error
    verifyJWTtoken: (ACCESS_SECRET, refresh_token) => {
        try {
            if (!refresh_token) {
                throw new Error("Unauthorized Access");
            } 
            const result = jwt.verify(refresh_token, ACCESS_SECRET);
            //console.log(result);
            return result;
        } catch (e) {
            throw new Error("Unauthorized Access");
        }
    },
    ////@return client_id:String || throw Error
    authJWTAccessToken: (client_id, access_token) => {
        try { 
            if (!access_token || !client_id) {
                throw new Error("Unauthorized Access");
            }
            let _token;
            const result = new Promise(async (resolve, reject) => {
                const token = jwt.sign({ client_id: client_id }, access_token, { expiresIn: Define.EXPIRE_TIME });
                if (token) {
                    _token = token;
                    resolve(token);
                    //next()
                } else {
                    reject("Unauthorized Access");
                }
            });
            if (result) {
                return result;
            } else {
                throw new Error("Unauthorized Access");
            }
        } catch (error) {
            throw new Error("Unauthorized Access");
        }
    }/// return token:promise || throw Error
}

module.exports = Helper