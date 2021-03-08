const bcrypt = require('bcrypt')
const connection = require('../database/connection')

const BCRYPT_SALT_ROUNDS = 10

const User = {
  findById: async function(id) {
    const user = await connection('users').where({ id }).first()
      
    return user
  },

  findByEmail: async function(email) {
      const user = await connection('users').where({ email }).first()
      
      return user
  },

  create: async function(userData) {
    const { email, password } = userData

    const userNotExists = await User.findByEmail(email)
    
    if (userNotExists)
      return 
    
    const hash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
    
    const userinsert = await connection('users').insert({email, password:hash})
    const userId = userinsert[0]

    const user = await User.findById(userId)
    user.password = undefined

    return user
  },
  
  verifyPassword: async function(user,givenPassword) { 
    const isValidPassword = await bcrypt.compare(givenPassword, user.password)
    
    return isValidPassword
  },
}

module.exports = User
