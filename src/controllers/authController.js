const User = require('../services/User')
const Auth = require('../services/Auth')

module.exports = {

  async auth(req,res){
    try{
      const { email, password } = req.body

      const user = await User.findByEmail(email)

      if (!user)
        return res.status(400).send({ error: 'Email not registered' })

      const invalidPassword = await User.verifyPassword(email,password)
      
      if (!invalidPassword)
        return res.status(400).send({ error: 'Invalid password' })
      
      user.password = undefined
      const token = Auth.generateToken({ id:user.id })

      return res.send({
        user,
        token:token,
        message: "User authenticated"
      })
    } catch(err){
        return res.status(400).send({ error: 'User authentication failed' }),
        console.log(err)
    }
  }
}