const Naver = require('../services/Naver')

module.exports = {
  async create (req,res){
    try{
      const naver = await Naver.create(req.body)
      
      return res.status(201).send(naver)
    } catch(err){
        return res.status(400).send({ error: 'Naver creation failed' }),
        console.log(err)
    }
  }
}