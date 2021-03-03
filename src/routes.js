const express = require('express')

const routes = express.Router()

const userController = require('./controllers/userController')

routes.get('/',(req, res) => {
  res.send('Hello World!')
})

routes.post('/user', userController.create)

module.exports = routes