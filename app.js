require('dotenv').config()
const http = require('http')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const blogrouter = require('./routes/blogposts')
const config = require('./utils/config')
const logger = require('./middleware/logger')
const middleware = require('./middleware/middleware')
const usersRouter = require('./controllers/usersrouter')
const loginRouter = require('./controllers/login')
const deleteRouter = require('./routes/deleteall')

logger.info('connecting to db')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
    .then(()=> {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDb', error.message)
    })


app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogrouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/delete/deleteall', deleteRouter)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})

module.exports = app.listen(3030)