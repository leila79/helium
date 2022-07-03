const { decodeJWT } = require('../../authentication/utils/jwt')
const url = require('url');
const { sendResponse } = require('../../../utils');
const { statusCodes, messages } = require('../../../utils');


const postIdSetter = (req, res, next) => {
    const parsed = url.parse(req.url)
    if(parsed.query){
        if((JSON.parse(JSON.stringify(parsed.query))).split("=")[0] == 'postId'){
            req.post_id = (JSON.parse(JSON.stringify(parsed.query))).split("=")[1];
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

const tokenDecoderLogin = (req, res, next) => {
    if(!req.headers.authorization){
        req.user_id = null
        return next()
    }
    else{
        const token = decodeJWT(req.headers.authorization)
        req.user_id = token.payload.userId
        return next()
    }
}

const indexTokenizer = (req, res, next) => {
    const parsed = url.parse(req.url)
    if(parsed.query){
        if((JSON.parse(JSON.stringify(parsed.query))).split("=")[0] == 'Index'){
            req.index = (JSON.parse(JSON.stringify(parsed.query))).split("=")[1];
            return next()
        }
        else sendResponse(res, statusCodes.FAILED, messages.FORBBIDEN)
    }
    else{
        sendResponse(res, statusCodes.FAILED, messages.FORBBIDEN)
    }
}

const likeTokenizer = (req,res,next) => {
    if(req.data.like !== undefined){
        req.like = req.data.like
        return next()
    }
    else{
        sendResponse(res, statusCodes.FAILED, messages.FORBBIDEN)
    }
}


module.exports={
    postIdSetter,
    tokenDecoder,
    indexTokenizer,
    tokenDecoderLogin,
    likeTokenizer,
}