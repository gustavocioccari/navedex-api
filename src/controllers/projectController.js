const Project = require('../services/Project')

module.exports = {
  async create(req,res) {
    const { name, navers } = req.body
    const user_id = req.userId

    try{
      const project = await Project.create({ name,navers,user_id })
      
      return res.status(201).send(project)
    } catch(err){
        return res.status(400).send({ error: 'project creation failed' }),
        console.log(err)
    }
  },

  async index(req,res) {
    const user_id = req.userId

    try {
      const projects = await Project.filterBy(req.query,user_id)

      return res.status(200).send(projects)
    } catch (err) {
        return res.status(400).send({ error: 'Check filter query' }),
        console.log(err)
    }
  },

  async update(req,res) {
    const { id } = req.params
    const user_id = req.userId
    
    try {
      const projectupdate = await Project.updateById(id,req.body,user_id)
      
      if (!projectupdate)
      return res.status(400).send({ 
        error: 'Check project id, it may not exist or may not belong to logged user'
      })

      return res.status(200).send(projectupdate)
    } catch (err) {
        return res.status(400).send({ error: 'project update failed' }),
        console.log(err)
    }
  },

  async delete(req,res) {
    const { id } = req.params
    const user_id = req.userId
    
    try {
      if (!await Project.deleteById(id,user_id))
        return res.status(400).send({ 
          error: 'Check naver id, it may not exist or may not belong to logged user'
        })

      return res.status(200).send({message: 'project deleted'})
    } catch (err) {
        return res.status(400).send({ error: 'project delete failed' }),
        console.log(err)
    }
  },

  async show(req,res) {
    const { id } = req.params
    const user_id = req.userId
    
    try{
      const project = await Project.getNavers(id,user_id)

      if (!project)
        return res.status(400).send({ 
          error: 'Check project id, it may not exist or may not belong to logged user' 
        })

      return res.status(200).send(project)
    } catch (err) {
        return res.status(400).send({ error: 'Show project failed' }),
        console.log(err)
    }   
  }
}