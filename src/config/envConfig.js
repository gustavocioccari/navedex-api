const dotenv = require('dotenv')
const path = require('path')

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
})

const { DATABASE } = process.env
const { HOST } = process.env
const { USER } = process.env
const { PASSWORD } = process.env
const { PORT } = process.env || 3333

module.exports = {
  DATABASE,
  HOST,
  USER,
  PASSWORD,
  PORT
}