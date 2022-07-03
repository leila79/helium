const postCtrl = require('./controllers/post.js');
const bookmarkCtrl = require('./controllers/bookmark')
const commentCtrl = require('./controllers/comment')
const dataParser = require('maya-data-parser')
const { indexTokenizer, tokenDecoder, postIdSetter, tokenDecoderLogin, likeTokenizer } = require('./utils/extract')
const { userIdSetter } = require('./../user-manager/utils/extract')

module.exports = {
  '/posts/all' : {
    GET: {
      function : postCtrl.getPosts,
      middlewares: [dataParser, tokenDecoderLogin, indexTokenizer]
    }
  },
  '/post': {
    GET: {
      function: postCtrl.postDetails,
      middlewares: [dataParser, tokenDecoderLogin, postIdSetter]
    },
    POST: {
      function : postCtrl.createPost,
      middlewares: [dataParser, tokenDecoder]
    }
  },
  '/comments':{
    GET: {
      function: commentCtrl.getPostComments,
      middlewares: [dataParser, postIdSetter]
    },
    POST: {
      function: commentCtrl.setPostComment,
      middlewares: [dataParser, tokenDecoderLogin, postIdSetter]
    }
  },

  '/like/post': {
    POST: {
      function: postCtrl.updatePostLikes,
      middlewares: [dataParser, tokenDecoder, postIdSetter, likeTokenizer]
    }
  },
  '/bookmark': {
    POST: {
      function : bookmarkCtrl.addBookmark,
      middlewares: [dataParser, tokenDecoder, postIdSetter]
    },
    DELETE: {
      function : bookmarkCtrl.deleteBookmark,
      middlewares: [dataParser, tokenDecoder, postIdSetter]
    }
  },
  '/user/bookmarks': {
    GET: {
      function : bookmarkCtrl.getUserBookmarks,
      middlewares: [dataParser, tokenDecoder]
    },
  },
  '/user/posts': {
    GET: {
      function: postCtrl.getUserPosts,
      middlewares: [dataParser, userIdSetter]
    },
  },
};