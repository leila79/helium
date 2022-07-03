const userCtrl = require('./controllers/user')
const followCtrl = require('./controllers/following')
const dataParser = require('maya-data-parser');
const { userIdSetter, tokenDecoder, followingIdSetter } = require('./utils/extract.js');

module.exports = {
  '/checkemail': {
    POST: {
      function: userCtrl.checkEmail,
      middlewares: [dataParser]
    },
  },
  '/changepass': {
    PUT: {
      function: userCtrl.changePassword,
      middlewares: [dataParser]
    },
  },
  '/user': {
    GET: {
      function: userCtrl.getProfileInfo,
      middlewares: [dataParser, userIdSetter]
    },
  },
  '/user/followers': {
    GET: {
      function: userCtrl.getUserFollowers,
      middlewares: [dataParser, userIdSetter]
    },
  },
  '/register': {
    POST: {
      function: userCtrl.register,
      middlewares: [dataParser]
    },
  },
  '/follow': {
    POST: {
      function: followCtrl.follow,
      middlewares: [dataParser, tokenDecoder, followingIdSetter]
    },
    DELETE: {
      function: followCtrl.unfollow,
      middlewares: [dataParser, tokenDecoder, followingIdSetter]
    },
  },
  '/profile/edit': {
    PUT: {
      function: userCtrl.editProfile,
      middlewares: [dataParser, tokenDecoder]
    },
  },
  
};