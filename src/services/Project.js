const connection = require('../database/connection')

const Project = {
  findById: async function(id) {
    const project = await connection('projects').where({ id }).first()
      
    return project
  },

  filterBy: async function(query){
    const projects = await connection('projects')
      .select('id','name',)
      .where(query)
      
    return projects
  },

  create: async function(projectData){
    const project = await connection('projects').insert(projectData)

    return project
  },

  deleteById: async function(id){   
    const projectdelete = await connection('projects').where({ id }).del()

    return projectdelete
  },

  updateById: async function(id,updateData){
    await connection('projects').update(updateData).where({ id })

    const project = await Project.findById(id)
    
    return project
  }
}

module.exports = Project