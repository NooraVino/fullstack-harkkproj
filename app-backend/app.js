const config = require('./utils/config')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const giftRouter = require('./controllers/gifts')


const url = config.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  app.use(cors())
  app.use(express.static('build'))
  app.use(express.json())

  app.use('/api/users', userRouter)
  app.use('/api/login', loginRouter)
  app.use('/api/gifts', giftRouter)




module.exports= app