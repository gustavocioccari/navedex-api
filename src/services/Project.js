const connection = require('../database/connection')

const Project = {
  findById: async function(id,user_id) {
    const project = await connection('projects').where({ id }).andWhere({ user_id }).first()
      
    return project
  },

  filterBy: async function(query,user_id) {
    const projects = await connection('projects')
      .select('id','name',)
      .where(query)
      .andWhere({ user_id })
      
    return projects
  },

  create: async function(projectData) {
    const { name, navers, user_id } = projectData
    
    const project = await connection('projects').insert({ name, user_id }).returning('*')

    const projectId = project[0].id
    project[0].user_id = undefined

    if (!navers)  
      return project

    const naverProject = navers.map((naverId) => {
      return {
        naver_id: naverId,
        project_id: projectId,
      }
    })

    await connection('navers_projects').insert(naverProject)
    
    const projectNavers = await Project.findById(projectId,user_id)
    projectNavers.user_id = undefined

    return projectNavers
  },

  deleteById: async function(id,user_id){   
    const projectdelete = await connection('projects').where({ id }).andWhere({ user_id }).del()

    return projectdelete
  },

  updateById: async function(id,updateData,user_id){
    const { name, navers } = updateData
    
    if (name)
      await connection('projects').update({ name }).where({ id }).andWhere({ user_id })

    if (!navers){      
      const project = await Project.findById(id,user_id)
      return project
    }

    const naverProject = navers.map((naverId) => {
      return {
        naver_id: naverId,
        project_id: id,
      }
    })

    await connection('navers_projects').insert(naverProject)
    const project = await Project.findById(id,user_id)

    if (!project)
      return false
      
    return project
  },

  getNavers: async function(id,user_id){
    const project = await connection('projects').where({ id }).andWhere({ user_id }).first()

    if (!project)
      return false

    const navers = await connection
                            .select('navers.id','navers.name','navers.birthdate','navers.admissiondate','navers.job_role')
                            .from('navers')
                            .join('navers_projects','navers.id','=','navers_projects.naver_id')
                            .where({ project_id:id })
    
    return {...project,navers}
  }
}

module.exports = Project