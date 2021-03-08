const User = require('../services/User')
const Auth = require('../services/Auth')

module.exports = {

  async create(req,res){
    const { email, password } = req.body
    try{
      const user = await User.findByEmail(email)

      if (user)
        return res.status(400).send({ error: 'User already exists' })

      const usercreated = await User.create({ email, password })

      const token = Auth.generateToken({ id:usercreated.id })

      return res.send({
        email,
        token:token
      })
    } catch(err){
        return res.status(400).send({ error: 'User creation failed' }),
        console.log(err)
    }
  }
}





