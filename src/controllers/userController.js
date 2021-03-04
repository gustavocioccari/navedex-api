const User = require('../services/User')
const Auth = require('../services/Auth')

module.exports = {

  async create(req,res){
    try{
      const user = await User.create(req.body)

      if (!user)
        return res.status(400).send({ error: 'User already exists' })

      const token = Auth.generateToken({ id:user.id })

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





