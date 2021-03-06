const express = require('express')

const routes = express.Router()

const userController = require('./controllers/userController')
const authController = require('./controllers/authController')
const naverController = require('./controllers/naverController')

const authMiddleware = require('./middlewares/authenticator')

routes.get('/',(req, res) => {
  res.send('Hello World!')
})

routes.post('/user', userController.create)

routes.post('/auth', authController.auth)

routes.use(authMiddleware)

routes.post('/naver', naverController.create)
routes.get('/naver', naverController.index)
routes.delete('/naver/:id', naverController.delete)
routes.patch('/naver/:id', naverController.update)

module.exports = routes