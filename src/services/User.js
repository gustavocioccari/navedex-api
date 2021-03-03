const bcrypt = require('bcrypt')
const connection = require('../database/connection')

const BCRYPT_SALT_ROUNDS = 10

const User = {
  findById: function(id) {
    const user = await connection('users').where({ id }).first()
      
    return user
  },

  findByEmail: async function(email) {
      const user = await connection('users').where({ email }).first()
      
      return user
  },

  create: async function(userData) {
    const { email, password } = userData

    const userExists = await connection('users').where({ email }).first()
    
    if (userExists)
      return { error: 'User already exists' }
    
    const hash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
    const user = await connection('users').insert({email, password:hash})

    user.password = undefined

    return user
  },
  
  verifyPassword: async function(email, givenPassword) {
    const user = await connection('users').where({ email }).first()
    
    if (!user)
      return { error: 'User not found' }

    if (!await bcrypt.compare(givenPassword, user.password)) 
      return { error: 'Invalid password' }

    user.password=undefined

    return user
  },
}

module.exports = User
