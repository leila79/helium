const { decodeJWT } = require('../../authentication/utils/jwt')
const url = require('url');
const { sendResponse } = require('../../../utils');
const { statusCodes, messages } = require('../../../utils');
const querystring = require('querystring')

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

const searchKeyTokenizer = (req, res, next) => {

    const parsed = url.parse(req.url)

    if(parsed.query){
        if((JSON.parse(JSON.stringify(parsed.query))).split("=")[0] == 'category'){
            req.search_key = querystring.parse(parsed.query).category
            console.log(decodeURI(req.search_key))
            // (JSON.parse(JSON.stringify(parsed.query))).split("=")[1];
            return next()
        }
        else sendResponse(res, statusCodes.FAILED, messages.FORBBIDEN)
    }
    else{
        sendResponse(res, statusCodes.FAILED, messages.FORBBIDEN)
    }
}
function reverseString(str) {
    // Step 1. Use the split() method to return a new array
    var splitString = str.split(""); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"]
 
    // Step 2. Use the reverse() method to reverse the new created array
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    // ["o", "l", "l", "e", "h"]
 
    // Step 3. Use the join() method to join all elements of the array into a string
    var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"
    
    //Step 4. Return the reversed string
    return joinArray; // "olleh"
}

module.exports={
    tokenDecoder,
    searchKeyTokenizer,
}