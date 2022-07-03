const { decodeJWT } = require('../../authentication/utils/jwt')
const url = require('url');
const { sendResponse } = require('../../../utils');
const { statusCodes, messages } = require('../../../utils');


const userIdSetter = (req, res, next) => {
    const parsed = url.parse(req.url)
    
    if(req.headers.authorization && parsed.query){
        const token = decodeJWT(req.headers.authorization)
        req.main_user_id = token.payload.userId

        if((JSON.parse(JSON.stringify(parsed.query))).split("=")[0] == 'userId'){
            req.user_id = (JSON.parse(JSON.stringify(parsed.query))).split("=")[1];
            return next()
        }
        else sendResponse(res, statusCodes.FAILED, messages.FORBBIDEN)
    }
    else if(req.headers.authorization){
        const token = decodeJWT(req.headers.authorization)
        req.user_id = token.payload.userId
        req.main_user_id = token.payload.userId
        return next()
    }
    else{
        sendResponse(res, statusCodes.FAILED, messages.FORBBIDEN)
    }
}

const followingIdSetter = (req, res, next) => {
    const parsed = url.parse(req.url)
   
    if(parsed.query){
        if((JSON.parse(JSON.stringify(parsed.query))).split("=")[0] == 'followingId'){
            req.following_id = (JSON.parse(JSON.stringify(parsed.query))).split("=")[1];
            return next()
        }
        else sendResponse(res, statusCodes.FAILED, messages.FORBBIDEN)
    }
    else{
        sendResponse(res, statusCodes.FAILED, messages.FORBBIDEN)
    }
}

const tokenDecoder = (req, res, next) => {
    if(!req.headers.authorization){
        sendResponse(res, statusCodes.FAILED, messages.FORBBIDEN)
    }
    else{
        const token = decodeJWT(req.headers.authorization)
        req.user_id = token.payload.userId
        return next()
    }
}


module.exports={
    userIdSetter,
    tokenDecoder,
    followingIdSetter,
}