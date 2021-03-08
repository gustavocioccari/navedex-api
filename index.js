const express = require('express')
const routes = require('./src/routes')
const cors = require('cors')
const { PORT } = require('./src/Config/envConfig')

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(PORT)

