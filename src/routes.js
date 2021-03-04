const express = require('express')

const routes = express.Router()

const userController = require('./controllers/userController')
const authController = require('./controllers/authController')

routes.get('/',(req, res) => {
  res.send('Hello World!')
})

routes.post('/user', userController.create)
routes.post('/auth', authController.auth)

module.exports = routes