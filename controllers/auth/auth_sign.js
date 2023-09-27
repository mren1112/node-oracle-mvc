const Response = require("../../models/Response/Response");
const Helper = require('../../utils/Helper');


class authenticateSignToken {
    static async sign_mid(req, res, next) {
        console.log(req.body);

        try {

            const { client_id, seclete_id } = req.body;

            if (!client_id && !seclete_id) {
                throw new Error("Unauthorized Access");
            }

            var token = await Helper.authJWTAccessToken(client_id, seclete_id);
            res.json({ success: true, refresh_token: token });

        } catch (err) {
            // res.status(401).json(new Response(true, err.message, err))
            res.status(err.status || 401 || 403 || 500).json({ success: false, messege: "Unauthorized Access" })
        }
    }

    static verify_mid(req, res, next) {
        const { seclete_id, refresh_token } = req.body;
        if (typeof refresh_token !== 'undefined') {
            if (!seclete_id && !refresh_token) {
                throw new Error("Unauthorized Access");
            }
            try {
                Helper.verifyJWTtoken(seclete_id, refresh_token);
                next();
            } catch (err) {
                res.status(403).json({ success: false, messege: "Unauthorized Access." })
            }
        } else {
            res.status(403).json({ success: false, messege: "Unauthorized Access" })
        }
    }
}


module.exports = { authenticateSignToken }