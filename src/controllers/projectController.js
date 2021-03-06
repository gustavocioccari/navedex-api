const Project = require('../services/Project')

module.exports = {
  async create(req,res) {
    try{
      const project = await Project.create(req.body)
      
      return res.status(201).send(project)
    } catch(err){
        return res.status(400).send({ error: 'project creation failed' }),
        console.log(err)
    }
  },

  async index(req,res) {
    try {
      const projects = await Project.filterBy(req.query)

      return res.status(200).send(projects)
    } catch (err) {
        return res.status(400).send({ error: 'Check filter query' }),
        console.log(err)
    }
  },

  async update(req,res) {
    const { id } = req.params
    
    try {
      const projectupdate = await Project.updateById(id,req.body)
      
      if (!projectupdate)
        return res.status(400).send({ error: 'Check project id' })

      return res.status(200).send(projectupdate)
    } catch (err) {
        return res.status(400).send({ error: 'project update failed' }),
        console.log(err)
    }
  },

  async delete(req,res) {
    const { id } = req.params
    
    try {
      if (!await Project.deleteById(id))
        return res.status(400).send({ error: 'Check project id' })

      return res.status(200).send({message: 'project deleted'})
    } catch (err) {
        return res.status(400).send({ error: 'project delete failed' }),
        console.log(err)
    }
  }
}