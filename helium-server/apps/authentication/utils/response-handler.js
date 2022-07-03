const { setHeaders } = require('../../../utils');
const { statusCodes, contentTypes } = require('../config');

module.exports.sendOk = (res, data) => {
    setHeaders(res)
    res.statuscode = statusCodes.SUCCESS
    res.end(JSON.stringify(data));
}

module.exports.sendFail = (res, data) => {
    setHeaders(res)
    res.statuscode = statusCodes.FAILED
    res.end(JSON.stringify(data));
}