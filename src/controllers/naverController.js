const Naver = require('../services/Naver')

module.exports = {
  async create(req,res) {
    try{
      const naver = await Naver.create(req.body)
      
      return res.status(201).send(naver)
    } catch(err){
        return res.status(400).send({ error: 'Naver creation failed' }),
        console.log(err)
    }
  },

  async index(req,res) {
    try {
      const navers = await Naver.filterBy(req.query)

      return res.status(200).send(navers)
    } catch (err) {
        return res.status(400).send({ error: 'Check filter query' }),
        console.log(err)
    }
  },

  async update(req,res) {
    const { id } = req.params
    
    try {
      const naverupdate = await Naver.updateById(id,req.body)
      
      if (!naverupdate)
        return res.status(400).send({ error: 'Check naver id' })

      return res.status(200).send(naverupdate)
    } catch (err) {
        return res.status(400).send({ error: 'Naver update failed' }),
        console.log(err)
    }
  },

  async delete(req,res) {
    const { id } = req.params
    
    try {
      if (!await Naver.deleteById(id))
        return res.status(400).send({ error: 'Check naver id' })

      return res.status(200).send({message: 'Naver deleted'})
    } catch (err) {
        return res.status(400).send({ error: 'Naver delete failed' }),
        console.log(err)
    }
  }
}