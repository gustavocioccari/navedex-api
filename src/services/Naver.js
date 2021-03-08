const connection = require('../database/connection')

const Naver = {
  findById: async function(id,user_id) {
    const naver = await connection('navers').where({ id }).andWhere({ user_id }).first()
      
    return naver
  },

  filterBy: async function(query,user_id){
    const navers = await connection('navers')
      .select('id',
              'name',
              'birthdate',
              'admissiondate',
              'job_role'
            )
      .where(query)
      .andWhere({ user_id })
      
    return navers
  },

  create: async function(naverData){
    const { name,birthdate,admissiondate,job_role,user_id } = naverData

    const naver = await connection('navers').insert({ name,birthdate,admissiondate,job_role,user_id }).returning('*')
    naver.user_id = undefined
    
    return naver
  },

  deleteById: async function(id,user_id){   
    const naverdelete = await connection('navers').where({ id }).andWhere({ user_id }).del()

    return naverdelete
  },

  updateById: async function(id,updateData,user_id){
    const naverupdate = await connection('navers').update(updateData).where({ id }).andWhere({ user_id }).returning('*')
    
    if (!naverupdate)
      return false

    const naver = await Naver.findById(id,user_id)
    
    return naver
  },

  getProjects: async function(id,user_id){
    const naver = await connection('navers').where({ id }).andWhere({ user_id }).first()

    if (!naver)
      return false

    const projects = await connection
                            .select('projects.id','projects.name')
                            .from('projects')
                            .join('navers_projects','projects.id','=','navers_projects.project_id')
                            .where({ naver_id:id })
    
    return {...naver,projects}
  }
}

module.exports = Naver