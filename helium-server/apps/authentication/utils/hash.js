const crypto = require('crypto')
const secret = 'helium';

const hashPwd = function hashPwd(password) {
    let hmac = crypto.createHmac('sha256', secret);
    return hmac.update(password).digest('hex');
};

module.exports = {
    hashPwd,
}