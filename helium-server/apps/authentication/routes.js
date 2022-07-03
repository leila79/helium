const auth = require('../authentication/controllers/auth.js')
const dataParser = require('maya-data-parser')

module.exports = {
  '/login': {
    POST: {
      function: auth.login,
      middlewares: [dataParser]
    },
  },
};