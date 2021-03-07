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
    const { user_id, name, navers } = projectData
    
    const projectinsert = await connection('projects').insert({name:name,user_id:user_id})

    const projectId = projectinsert[0]

    if (!navers){
      const project = await Project.findById(projectId)
      return project
    }

    const naverProject = navers.map((naverId) => {
      return {
        naver_id: naverId,
        project_id: projectId,
      }
    })

    await connection('navers_projects').insert(naverProject)
    
    const project = await Project.findById(projectId)

    return project
  },

  deleteById: async function(id){   
    const projectdelete = await connection('projects').where({ id }).del()

    return projectdelete
  },

  updateById: async function(id,updateData){
    const { name, navers } = updateData
    
    if (name)
      await connection('projects').update({name}).where({ id })

    if (!navers){      
      const project = await Project.findById(id)
      return project
    }

    const naverProject = navers.map((naverId) => {
      return {
        naver_id: naverId,
        project_id: id,
      }
    })

    await connection('navers_projects').insert(naverProject)
    const project = await Project.findById(id)
      
    return project
  }
}

module.exports = Project