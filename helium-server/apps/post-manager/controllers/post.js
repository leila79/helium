const Post = require('../models/Post.js')
const { sendResponse, query } = require('./../../../utils.js')
const { statusCodes, messages } = require('../../../utils');
const { stringToDbArray } = require('../utils/converter.js')


/*get 3 recent posts that are written*/
async function getPosts(req, res){
  const index = req.index
  let posts = []

  try {
      
      if(req.user_id != null){
        var bookmarks = await query(`SELECT post_id FROM bookmarks WHERE user_id=${req.user_id}`)
        var followings = await query(`SELECT following_id FROM follows WHERE user_id=${req.user_id}`)
      }
      var _posts  = await query(`SELECT 
                                distinct posts.*,
                                array_agg(tags.title) as post_tags
                                FROM posts 
                                INNER JOIN tags ON posts.id=tags.post_id 
                                WHERE posts.id>${index}  
                                GROUP BY posts.id 
                                ORDER BY posts.id LIMIT 6`)

      Array.prototype.push.apply(posts, _posts.rows)


      for(let i=0 ; i < posts.length ; i++){
          posts[i] = new Post(posts[i])
          let users = await query(`SELECT first_name,last_name,profile_image FROM users WHERE user_id=${posts[i].user_id}`)
          posts[i].setAuthor(users.rows[0])

          //check if posts are bookmarked for user and if author is followed by user
          if(req.user_id != null) {
            //check if post is user's post
            if(posts[i].user_id == req.user_id) posts[i].setUserPost(true)
            
            posts[i].setIsBookmarked(false)
            posts[i].setIsFollowing(false)

            for (let j = 0; j < bookmarks.rows.length; j++) {
              if(posts[i].id == bookmarks.rows[j].post_id) {
                posts[i].setIsBookmarked(true)
                break
              }
            }

            for (let j = 0; j < followings.rows.length; j++) {
              if(posts[i].user_id == followings.rows[j].following_id){
                posts[i].setIsFollowing(true)
                break
              }
            }

          }
      }   

      const checkMorePosts  = await query(`SELECT * FROM posts WHERE id>${index} order by id LIMIT 4`)
      if(checkMorePosts.rows.length >= 4) 
        sendResponse(res, statusCodes.SUCCESS, messages.SUCCESS, {posts, is_more_posts: true})
      else 
        sendResponse(res, statusCodes.SUCCESS, messages.SUCCESS, {posts, is_more_posts: false})
    }catch (err) {
      console.log('Database ' + err)
      sendResponse(res, statusCodes.FAILED, messages.FAILED)
  }

}

/*get details of a post*/
async function postDetails(req, res){
  const post_id = req.post_id
  const user_id = req.user_id

  try {
    const posts  = await query(`SELECT 
                                distinct posts.*,
                                array_agg(tags.title) as post_tags
                                FROM posts 
                                INNER JOIN tags ON posts.id=tags.post_id 
                                WHERE posts.id=${post_id}  
                                GROUP BY posts.id `);
    var post = new Post(posts.rows[0])
    let likes = await query( `SELECT COUNT(*) FROM likes WHERE post_id=${post_id}`)
    post.setLikeNumber(likes.rows[0].count)

    let is_liked = await query( `SELECT COUNT(*) FROM likes WHERE post_id=${post_id} AND user_id=${user_id}`)
    if(is_liked.rows[0].count > 0 ) post.setIsLiked(true)
    else post.setIsLiked(false)

    //author information 
    const author = await query(`SELECT first_name,last_name,profile_image,user_id FROM users WHERE user_id=${post.user_id}`);
    post.setAuthor(author.rows[0])

    const tags = await query(`SELECT title FROM tags WHERE post_id=${post.id}`);
    post.setTags(tags.rows);
    
    if(req.user_id!=null){
      post.setIsBookmarked(false)
      post.setIsFollowing(false)
      if(post.user_id == req.user_id) post.setUserPost(true)

      var following = await query(`SELECT following_id FROM follows WHERE user_id=${req.user_id} AND following_id=${post.user_id}`)
      const bookmark = await query(`SELECT * FROM bookmarks WHERE user_id=${req.user_id} AND post_id=${post.id}`)
      
      if(following.rows.length > 0) post.setIsFollowing(true)
      if(bookmark.rows.length > 0) post.setIsBookmarked(true)
    }

    
    let other_posts = await query(`SELECT * FROM posts WHERE user_id=${post.user_id} AND id!=${post_id} ORDER BY date ASC LIMIT 3`); 
    other_posts = other_posts.rows.map( other_post => new Post(other_post));

    if(other_posts.length > 0) {
      if(req.user_id != null)
          var bookmarks = await query(`SELECT * FROM bookmarks WHERE user_id=${req.user_id}`)

      post.setMorePosts(other_posts)
      for(let i=0; i < post.getMorePosts().length; i++){
        const tags = await query(`SELECT title FROM tags WHERE post_id=${post.getMorePosts()[i].id}`);
        post.getMorePosts()[i].setTags(tags.rows)

        if(req.user_id != null){

          //check if author is user's following
          for (let j = 0; j < following.rows.length; j++) {
            if(post.getMorePosts()[i].user_id == following.rows[j].following_id){
              post.getMorePosts()[i].setIsFollowing(true)
              break
            }
          } 
          //check if its user's bookmark
          for (let j = 0; j < bookmarks.rows.length; j++) {
            if(post.getMorePosts()[i].id == bookmarks.rows[j].post_id) {
              post.getMorePosts()[i].setIsBookmarked(true)
              break
            }
          }
        }
        
      }
    }
    else post.setMorePosts([])
    sendResponse(res, statusCodes.SUCCESS, messages.SUCCESS, post)
  }catch (err) {
    console.log('Database ' + err)
    sendResponse(res, statusCodes.FAILED, messages.FAILED)
  }
 
}

async function createPost(req, res){
  
  const user_id = req.user_id
  const date = new Date()
  const reading_time = req.data.reading_time
  const tags = req.data.tags
  const title = stringToDbArray(req.data.title)
  const description = stringToDbArray(req.data.description)
  const post_images = stringToDbArray(req.data.post_images)
 
  try{
    const post_id = (await query(`SELECT max(id) FROM posts`)).rows[0].max + 1

    const insert = await query(`INSERT INTO posts(id,title,description,post_images,user_id,date,reading_time) 
    VALUES(${post_id},'${title}','${description}','${post_images}',${user_id},'${date.toLocaleDateString("en-US")}','${reading_time}') RETURNING id`)

    // for (let i = 0; i < tags.length; i++) 
       await query(`INSERT INTO tags(post_id,title) VALUES(${post_id}, '${tags}')`)
    
    sendResponse(res, statusCodes.SUCCESS, messages.SUCCESS)
  }catch(err){
    console.log("Database ", err);
    sendResponse(res, statusCodes.FAILED, messages.FAILED)
  }
  
}

async function updatePostLikes(req, res){
  const post_id = req.post_id
  const user_id = req.user_id
  const like = req.like
  
  try{
    if(like > 0){
      const duplicate = await query(`SELECT COUNT(*) FROM likes WHERE user_id=${user_id} AND post_id=${post_id}`)
      if(duplicate.rows[0].count > 0){
        sendResponse(res, statusCodes.FAILED, messages.FAILED)
      }else{
        await query(`INSERT INTO likes(post_id,user_id) VALUES(${post_id},${user_id}) `)
        sendResponse(res, statusCodes.SUCCESS, messages.SUCCESS)
      }
    }else{
      await query(`DELETE FROM likes WHERE post_id=${post_id} AND user_id=${user_id}`)
      sendResponse(res, statusCodes.SUCCESS, messages.SUCCESS)
    }
    
    
  }catch(err){
    sendResponse(res, statusCodes.FAILED, messages.FAILED)
  }
}

/* get user posts */
async function getUserPosts(req, res){
  const user_id = req.user_id
  let user_posts = []

  try{
    const posts  = await query(`SELECT distinct posts.*, COUNT(likes.*) as like_number
                                FROM posts 
                                INNER JOIN likes
                                ON posts.id=likes.post_id
                                WHERE posts.user_id=${user_id}
                                GROUP BY posts.id`)

    
    Array.prototype.push.apply(user_posts, posts.rows)
    if(req.main_user_id) {
      var bookmarks = await query(`SELECT post_id FROM bookmarks WHERE user_id=${req.main_user_id}`)
    }

    for(let i=0 ; i < user_posts.length ; i++){
      user_posts[i] = new Post(user_posts[i])
      let users = await query(`SELECT first_name,last_name,profile_image FROM users WHERE user_id=${user_posts[i].user_id}`)
      
      let tags = await query(`SELECT title FROM tags WHERE post_id=${user_posts[i].id}`)
      
      let is_liked = await query(`SELECT COUNT(*) FROM likes WHERE user_id=${req.main_user_id} AND post_id=${user_posts[i].id}`)
      if(is_liked.rows[0].count > 0) user_posts[i].setIsLiked(true)
      else user_posts[i].setIsLiked(false)

      let comment_number = await query(`SELECT COUNT(*) FROM comments WHERE post_id=${user_posts[i].id} `)

      user_posts[i].setCommentNumber(comment_number.rows[0].count)
      user_posts[i].setTags(tags.rows)
      user_posts[i].setAuthor(users.rows[0])
      user_posts[i].setIsBookmarked(false)

      for (let j = 0; j < bookmarks.rows.length; j++) {
        if(user_posts[i].id == bookmarks.rows[j].post_id) {
          user_posts[i].setIsBookmarked(true)
          break
        }
      }
    }    
    
    sendResponse(res, statusCodes.SUCCESS, messages.SUCCESS, user_posts)
  }
  catch(err){
    console.log(err)
    sendResponse(res, statusCodes.FAILED, messages.FAILED)
  }
}

module.exports = {
    getPosts,
    postDetails,
    createPost,
    updatePostLikes,
    getUserPosts,
}