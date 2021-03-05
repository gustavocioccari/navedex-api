const connection = require('../database/connection')

const Naver = {
  findById: async function(id) {
    const naver = await connection('navers').where({ id }).first()
      
    return naver
  },

  filterBy: async function(query){
    if (Naver.findById(id)){
      const navers = await connection('navers')
        .select('id','name','birthdate','admissiondate','job_role')
        .where(query)
      return navers
    }
    return { error:'Naver not found' }
  },

  create: async function(naverData){
    const naver = await connection('navers').insert(naverData)

    return naver
  },

  deleteById: async function(id){
    if (Naver.findById(id)){
      await connection('navers').where({ id }).del()
      return { message:'Naver deleted successfully' }
    }
    return { error:'Naver not found' }
  },

  updateById: async function(id,updateData){
    if (Naver.findById(id)){
      const naver = await connection('navers').where({ id }).update(updateData)
      return naver
    }
    return { error:'Naver not found' }
  }
}

module.exports = Naver