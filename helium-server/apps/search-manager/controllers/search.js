const Post = require('../models/Post.js')
const { sendResponse, query } = require('./../../../utils.js')
const { statusCodes, messages } = require('../../../utils')

const encoding = require('encoding')
const User = require('../models/User.js')

async function searchInPosts(req, res){
    let search_key = req.search_key
    search_key = search_key.replace(' ', '%')
    let posts = []

    try{
        if(req.user_id != null){
            var bookmarks = await query(`SELECT post_id FROM bookmarks WHERE user_id=${req.user_id}`)
            var followings = await query(`SELECT following_id FROM follows WHERE user_id=${req.user_id}`)
        }
        
        const _posts = await query(`SELECT distinct posts.*,array_agg(tags.title) as post_tags
                                   FROM posts 
                                   INNER JOIN tags ON posts.id=tags.post_id
                                   WHERE posts.title
                                   LIKE '%${search_key}%' OR description
                                   LIKE '%${search_key}%'
                                   GROUP BY posts.id`)
        

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
        sendResponse(res, statusCodes.SUCCESS, messages.SUCCESS, posts)
    }catch(err){
        console.log('Datbase Error: '+err)
        sendResponse(res, statusCodes.FAILED, messages.FAILED)
    }
}

async function searchInUsers(req, res){
    let search_key = req.search_key
    search_key = search_key.replace(' ', '%')
    let users = []

    try{
        if(req.user_id != null){
            var followings = await query(`SELECT * FROM follows WHERE user_id=${req.user_id}`)
        }
        const _users = await query(`SELECT * FROM users WHERE bio LIKE '%${search_key}%' OR long_bio LIKE '%${search_key}%'`)
        Array.prototype.push.apply(users, _users.rows)
        for(let i=0; i<users.length; i++){
            users[i] = new User(users[i])

            users[i].setIsUser(false)
            if(users[i].user_id == req.user_id) 
                users[i].setIsUser(true)

            users[i].setIsFollowed(false)
            for(let j=0; j<followings.rows.length; j++){
                if(users[i].user_id == followings.rows[j].following_id){
                    users[i].setIsFollowed(true)
                    break
                }
            }
        }
        sendResponse(res, statusCodes.SUCCESS, messages.SUCCESS, users)
    }catch(err){
        console.log('Datbase Error: '+err)
        sendResponse(res, statusCodes.FAILED, messages.FAILED)
    }
}

async function searchInTags(req, res){
    let search_key = req.search_key
    search_key = search_key.replace(' ', '%')

    try{
        const tags = await query(`SELECT distinct title FROM tags WHERE title LIKE '%${search_key}%'`)
        sendResponse(res, statusCodes.SUCCESS, messages.SUCCESS, tags.rows)
    }catch(err){
        console.log('Datbase Error: ' + err)
        sendResponse(res, statusCodes.FAILED, messages.FAILED)
    }
}

module.exports = {
    searchInPosts,
    searchInTags,
    searchInUsers,
}