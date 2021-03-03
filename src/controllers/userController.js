const jwt = require('jsonwebtoken')
const User = require('../services/User')

const authConfig = require('../config/auth.json')

function generateToken(params = {}){
  return jwt.sign(
    params,
    authConfig.secret,
    { expiresIn:authConfig.expiresIn }
  )
}

module.exports = {

  async create(req,res){
    try{
      const user = await User.create(req.body)

      const token = generateToken({ id:user.id })

      return res.send({
        user,
        token:token
      })
    } catch(err){
        return res.status(400).send({ error: 'User creation failed' }),
        console.log(err)
    }
  }
}





