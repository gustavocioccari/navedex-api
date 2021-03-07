const connection = require('../database/connection')

const Naver = {
  findById: async function(id) {
    const naver = await connection('navers').where({ id }).first()
      
    return naver
  },

  filterBy: async function(query){
    const navers = await connection('navers')
      .select('id',
              'name',
              'birthdate',
              'admissiondate',
              'job_role'
            )
      .where(query)
      
    return navers
  },

  create: async function(naverData){
    const naver = await connection('navers').insert(naverData)

    return naver
  },

  deleteById: async function(id){   
    const naverdelete = await connection('navers').where({ id }).del()

    return naverdelete
  },

  updateById: async function(id,updateData){
    await connection('navers').update(updateData).where({ id })
    
    const naver = await Naver.findById(id)
    
    return naver
  },

  getProjects: async function(id){
    const naver = await connection('navers').where({ id })
    const projects = await connection
                            .select('projects.id','projects.name')
                            .from('projects')
                            .join('navers_projects','projects.id','=','navers_projects.project_id')
                            .where({ naver_id:id })
    
    return {...naver,projects}
  }
}

module.exports = Naver