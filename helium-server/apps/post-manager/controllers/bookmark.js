const { sendResponse, query } = require('./../../../utils.js')
const { statusCodes, messages } = require('../../../utils')
const Post = require('../../post-manager/models/Post.js')


async function addBookmark(req, res) {
    const user_id = req.user_id
    const post_id = req.post_id
  
    try{
      await query(`INSERT INTO bookmarks (user_id, post_id) VALUES (${user_id}, ${post_id})`)
      sendResponse(res, statusCodes.SUCCESS, messages.SUCCESS)
    }catch(err){
      console.log(err);
      sendResponse(res, statusCodes.FAILED, messages.FAILED)
    }
  }
  
  async function deleteBookmark(req, res) {
    const user_id = req.user_id
    const post_id = req.post_id
  
    try{
      await query(`DELETE FROM bookmarks WHERE user_id=${user_id} AND post_id=${post_id}`)
      sendResponse(res, statusCodes.SUCCESS, messages.SUCCESS)
    }catch(err){
      console.log(err);
      sendResponse(res, statusCodes.FAILED, messages.FAILED)
    }
  }

  
/* get user bookmarks */
async function getUserBookmarks(req, res){
  const user_id = req.user_id
  let user_bookmarks = []

  try{
    const bookmarks = await query(`SELECT * from posts WHERE id IN (SELECT post_id from bookmarks WHERE user_id=${user_id})`)
    Array.prototype.push.apply(user_bookmarks, bookmarks.rows)
    
    //user followings
    var followings = await query(`SELECT following_id FROM follows WHERE user_id=${req.user_id}`)

    for(let i=0 ; i < user_bookmarks.length ; i++){
        user_bookmarks[i] = new Post(user_bookmarks[i])
        let users = await query(`SELECT first_name,last_name,profile_image FROM users WHERE user_id=${user_bookmarks[i].user_id}`);
        let tags = await query(`SELECT title FROM tags WHERE post_id=${user_bookmarks[i].id}`);

        user_bookmarks[i].setTags(tags.rows);
        user_bookmarks[i].setAuthor(users.rows[0]);
        
        if(user_bookmarks[i].user_id == user_id) user_bookmarks[i].setUserPost(true)

        user_bookmarks[i].setIsFollowing(false)
        for (let j = 0; j < followings.rows.length; j++) {
          if(user_bookmarks[i].user_id == followings.rows[j].following_id){
            user_bookmarks[i].setIsFollowing(true)
            break
          }
        }
    }    
    sendResponse(res, statusCodes.SUCCESS, messages.SUCCESS, user_bookmarks)
  }catch(err){
    console.log('Database ' + err)
    sendResponse(res, statusCodes.FAILED, messages.FAILED)
  }
 

}
  
module.exports = {
    addBookmark,
    deleteBookmark,
    getUserBookmarks,
}