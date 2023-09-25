require('dotenv').config();
const jwt = require('jsonwebtoken');
const moment = require('moment');
const Define = require('./Define');

const Helper = {
    //@get a date after 1 day @return miliseconds
    getExpireDay: (day = 1) => {
        return moment().add(day, Define.DAYS).valueOf();
    },
    //@return token:String
    getJWTtoken: (username, expires) => {
        if (expires) {
            return jwt.sign({ username: username }, process.env.ACCESS_SECRET, { expiresIn: expires });
        } else {
            return jwt.sign({ username: username }, process.env.ACCESS_SECRET);
        }
    },
    //@return username:String || throw Error
    verifyJWTtoken: (token) => {
        try {
            if (!token) {
                throw new Error("Unauthorized Access");
            }
            const username = jwt.verify(token, process.env.ACCESS_SECRET);
            return username;
        } catch (e) {
            throw new Error("Unauthorized Access");
        }
    },
    ////@return username:String || throw Error
    authJWTAccessToken: (username, token) => {
        try {
            //const username = req.body.username; //post
            const username = req.params.username;
            let access_token;
            const result = new Promise(async (resolve, reject) => {
                const token = jwt.sign({ username: username }, token, { expiresIn: Define.EXPIRE_TIME });
                if (token) {
                    access_token = token;
                    resolve(token);
                    next()
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
    }
}

module.exports = Helper