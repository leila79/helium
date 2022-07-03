const { TOKEN_KEY } = require('../config');
const jwt = require("jsonwebtoken");

 function signJWT(payload) {
    return jwt.sign(
        payload,
        TOKEN_KEY,
    );
}

function decodeJWT(token){
    return jwt.decode(token, { complete: true })
}

module.exports = {
    signJWT,
    decodeJWT,
}