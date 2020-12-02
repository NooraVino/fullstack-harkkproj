
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    //console.log(authorization)
    return authorization.substring(7)

  }
  return null
}

userRouter.get('/', (request, response, next) => {

  try {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    User.find({}).then(users => {
      response.json(users)

    })
  }
  catch (exception) {
    response.status(401).json({ error: 'invalid token' })
  }
})

userRouter.get('/:id', (request, response) => {
  User.findById(request.params.id).then(user => {
    response.json(user)
  })
})

userRouter.post('/', async (request, response) => {
  const body = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  if (body.username === undefined) {
    return response.status(400).json({ error: 'username missing' })
  }
  const user = new User({
    username: body.username,
    passwordHash,
  })

  const savedUser = await user.save()
  response.json(savedUser)


})

module.exports = userRouter