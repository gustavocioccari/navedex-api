const Naver = require('../services/Naver')

module.exports = {
  async create(req,res) {
    const {
      name,
      birthdate,
      admissiondate,
      job_role
    } = req.body
    const user_id = req.userId

    try{
      const naver = await Naver.create({ name,birthdate,admissiondate,job_role,user_id })
      
      return res.status(201).send(naver)
    } catch(err){
        return res.status(400).send({ error: 'Naver creation failed' }),
        console.log(err)
    }
  },

  async index(req,res) {
    const user_id = req.userId
    
    try {
      const navers = await Naver.filterBy(req.query,user_id)

      return res.status(200).send(navers)
    } catch (err) {
        return res.status(400).send({ error: 'Check filter query' }),
        console.log(err)
    }
  },

  async update(req,res) {
    const { id } = req.params
    const user_id = req.userId
    
    try {
      const naverupdate = await Naver.updateById(id,req.body,user_id)
      
      if (!naverupdate)
        return res.status(400).send({ 
          error: 'Check naver id, it may not exist or may not belong to logged user'
        })

      return res.status(200).send(naverupdate)
    } catch (err) {
        return res.status(400).send({ error: 'Naver update failed' }),
        console.log(err)
    }
  },

  async delete(req,res) {
    const { id } = req.params
    const user_id = req.userId
    
    try {
      if (!await Naver.deleteById(id,user_id))
        return res.status(400).send({ 
          error: 'Check naver id, it may not exist or may not belong to logged user'
        })

      return res.status(200).send({message: 'Naver deleted'})
    } catch (err) {
        return res.status(400).send({ error: 'Naver delete failed' }),
        console.log(err)
    }
  },

  async show(req,res) {
    const { id } = req.params
    const user_id = req.userId
    
    try{
      const naver = await Naver.getProjects(id,user_id)

      if (!naver)
        return res.status(400).send({ 
          error: 'Check naver id, it may not exist or may not belong to logged user' 
        })

      return res.status(200).send(naver)
    } catch (err) {
        return res.status(400).send({ error: 'Show naver failed' }),
        console.log(err)
    }   
  }
}