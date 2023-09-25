/**
 * @design by milon27
 */

const Response = require('../models/Response');
const Helper = require('../utils/Helper');
const auth_mid = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            throw new Error("Unauthorized Access");
        }
        //token validation
        const username = Helper.verifyJWTtoken(token);
        //set user email in request
        req.username = username;
        next();
    } catch (e) {
        res.status(401).json(new Response(true, e.message, e));
    }

}

 function verifyAccessToken(req, res, next) {
    /*const cookieHeader = req.headers?.cookie;
    // console.log('Cookies: ', cookieHeader);  
    const splits = cookieHeader && cookieHeader.split('=')[1];
    console.log('Cookies: ', splits);*/

    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader && bearerHeader.split(' ')[1];
        req.token = bearer;
        try {
            var decoded = jwt.verify(bearer, process.env.TOKEN_SECRET);
            console.log(decoded)
            res.json({ decoded }); 
            // next();
        } catch (err) {
            res.json({ err });
        }
        // res.json({ bearerToken });
        next();
    } else {
        res.json('err');
    }
}


async function verifyAccessTokenWithParams(req, res, next) {
    /*const cookieHeader = req.headers?.cookie;
    // console.log('Cookies: ', cookieHeader);  
    const splits = cookieHeader && cookieHeader.split('=')[1];
    console.log('Cookies: ', splits);*/

    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader && bearerHeader.split(' ')[1];
        req.token = bearer;
        try {
            var decoded = jwt.verify(bearer, process.env.TOKEN_SECRET); 
            return decoded;
        } catch (err) {
            res.json({ err });
        }
        // res.json({ bearerToken });
        next();
    } else {
        res.json('err');
    }
}

module.exports = auth_mid;