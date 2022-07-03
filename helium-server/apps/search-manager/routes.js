const searchCtrl = require('./controllers/search.js')
const dataParser = require('maya-data-parser')
const { tokenDecoder, searchKeyTokenizer } = require('./utils/extract')

module.exports = {
  '/search/posts' : {
    GET: {
      function : searchCtrl.searchInPosts,
      middlewares: [dataParser, tokenDecoder, searchKeyTokenizer]
    }
  },
  '/search/users' : {
    GET: {
      function : searchCtrl.searchInUsers,
      middlewares: [dataParser, tokenDecoder, searchKeyTokenizer]
    }
  },
  '/search/tags' : {
    GET: {
      function : searchCtrl.searchInTags,
      middlewares: [dataParser, tokenDecoder, searchKeyTokenizer]
    }
  }
};