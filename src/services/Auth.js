const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

const Auth = {

  generateToken: function(params = {}){
    return jwt.sign(
      params,
      authConfig.secret,
      { expiresIn:authConfig.expiresIn }
    )
  }
}

module.exports = Auth