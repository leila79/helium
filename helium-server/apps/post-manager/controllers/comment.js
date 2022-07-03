const { sendResponse, query } = require('./../../../utils.js')
const { statusCodes, messages } = require('../../../utils')


async function getPostComments(req, res){
    const post_id = req.post_id
  
    try{
      //post comments & replies
      const comments = await query(`SELECT * FROM comments WHERE post_id=${post_id} ORDER BY date ASC`);
  
      for(let i= 0 ; i < comments.rows.length ; i++){
        const replies = await query(`SELECT * FROM replies WHERE comment_id=${comments.rows[i].id}`);
        const cm_user = await query(`SELECT first_name,last_name,profile_image FROM users WHERE user_id=${comments.rows[i].user_id}`);
        comments.rows[i].first_name = cm_user.rows[0].first_name;
        comments.rows[i].last_name = cm_user.rows[0].last_name;
  
        for(let item=0; item < replies.rows.length ; item++){
          const rep_user = await query(`SELECT first_name,last_name,profile_image FROM users WHERE user_id=${replies.rows[item].user_id}`);
          replies.rows[item].first_name = rep_user.rows[0].first_name;
          replies.rows[item].last_name = rep_user.rows[0].last_name;
        }
        comments.rows[i].replies =replies.rows;
      }
      // post.comments = comments.rows;
      sendResponse(res, statusCodes.SUCCESS, messages.SUCCESS, comments.rows)
    }catch(err){
      console.log('Database ' + err)
      sendResponse(res, statusCodes.FAILED, messages.FAILED)
    }
  }
  
  async function setPostComment(req, res){
    const post_id = req.post_id
    const user_id = req.user_id
    const date = new Date()
  
    let comment_text = ''
    if(req.data.comment_text)  comment_text = req.data.comment_text
    else sendResponse(res, statusCodes.FAILED, messages.FAILED)
  
    try{
      let last_id = await query(`SELECT MAX(id) from comments`)
      last_id = last_id.rows[0].max
  
      await query(`INSERT INTO comments(id,post_id,user_id,date,reading_time,like_number,comment_text) 
      VALUES(${last_id+1},${post_id},${user_id},'${date.toLocaleDateString("en-US")}',1,0,'${comment_text}')`)
  
      sendResponse(res, statusCodes.SUCCESS, messages.SUCCESS)
    }catch(err){
      console.log('Database ' + err)
      sendResponse(res, statusCodes.FAILED, messages.FAILED)
    }
  }
  
  module.exports = {
      getPostComments,
      setPostComment,
  }