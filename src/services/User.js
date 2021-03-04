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
    const user = await connection('users').insert({email, password:hash})

    user.password = undefined

    return user
  },
  
  verifyPassword: async function(email, givenPassword) {
    const user = await User.findByEmail(email)
    
    if (!user)
      return { error: 'User not found' }
    
    if (!await bcrypt.compare(givenPassword, user.password)) 
      return false

    user.password=undefined

    return user
  },
}

module.exports = User
