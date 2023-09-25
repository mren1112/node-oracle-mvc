
class Response {
    //boolean,string,obj
    constructor(error, message, data) {
        this.error = error;
        this.message = message;
        this.response = data;
    }
}

const sendAuthorization = (url, accessToken) => {
    return {
        method: "get",
        url: url,
        headers: {
            Authorization: `Bearer ${accessToken} `,
            "Content-type": "application/json",
        },
    };
};

module.exports = { Response, sendAuthorization };