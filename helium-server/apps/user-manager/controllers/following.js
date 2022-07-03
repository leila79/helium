const { query, sendResponse } = require('../../../utils.js')
const { statusCodes, messages } = require('../../../utils')

async function follow(req, res) {
    const following_id = req.following_id
    const user_id = req.user_id
  
    try{
      const duplicate = await query(`SELECT COUNT(*) FROM follows WHERE following_id=${following_id} AND user_id=${user_id}`)
      
      if(duplicate.rows[0].count > 0){
        sendResponse(res, statusCodes.FAILED, messages.FAILED)
      }
      else{
        await query(`INSERT INTO follows (following_id, user_id) VALUES (${following_id},${user_id})`)
        sendResponse(res, statusCodes.SUCCESS, messages.SUCCESS)
      }  
      
    }catch(err){
      console.log('Database ', err)
      sendResponse(res, statusCodes.FAILED, messages.FAILED)
    }
  }
  
  async function unfollow(req, res) {

    const following_id = req.following_id
    const user_id = req.user_id

    try{
      await query(`DELETE FROM follows WHERE following_id=${following_id} AND user_id=${user_id}`)
      sendResponse(res, statusCodes.SUCCESS, messages.SUCCESS)
    }catch(err){
      console.log('Database ', err)
      sendResponse(res, statusCodes.FAILED, messages.FAILED)
    }
  }

  module.exports = {
    follow,
    unfollow,
}