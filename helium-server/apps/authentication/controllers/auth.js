const { messages, TOKEN_KEY, statusCodes } = require("../config.js")
const { signJWT } = require('../utils/jwt.js');
const { sendResponse, query } = require('../../../utils.js')
const { hashPwd } = require('../utils/hash.js')

async function login(req, res){
    const { username, password } = req.data; //username and password user sent
    let user_id = -1;

    if (!username || !password) {
        sendResponse(res, statusCodes.UNAUTHORIZED, messages.FAILED)
    }

    try{
        const users = await query(`SELECT user_id, username, password FROM users`)
        var _password; 
        for (let i = 0; i < users.rows.length; i++) {
            if(users.rows[i].username === username){
                user_id = users.rows[i].user_id; 
                _password = users.rows[i].password;  //real user's password(hashed)
            }
        }
        const passHash = hashPwd(password);
        
        if (_password !== passHash) {
            sendResponse(res, statusCodes.UNAUTHORIZED, messages.FAILED)
        }
        else{
            const token = signJWT({userId: user_id}, TOKEN_KEY)
            sendResponse(res, statusCodes.SUCCESS, messages.SUCCESS, {token: token})
        }
    }
    catch(err){
        console.log('Database Error: ', err);
        sendResponse(res, statusCodes.UNAUTHORIZED, messages.FAILED)
    }
    
}


module.exports = {
    login,
}
