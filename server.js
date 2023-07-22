require('dotenv').config()
const PORT = process.env.PORT || 3001
const express = require('express')
const app = express()
require('./connection/mongo.js')
const cors = require('cors')

app.use(cors())
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));


const handleError = require('./middlewares/handleError.js')
const notFound = require('./middlewares/notFound.js')
const travelsRouter = require('./controllers/travels.route.js')
const loginRouter = require('./controllers/login.route')
const usersRouter = require('./controllers/users.route.js')


app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/travels', travelsRouter)
app.use(notFound)
app.use(handleError)

app.listen(PORT, () => {
   console.log(`aplicacion corriendo en puerto ${PORT}`)
})