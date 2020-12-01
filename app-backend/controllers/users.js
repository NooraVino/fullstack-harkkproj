
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', (request, response) => {
  User.find({}).then(users => {
    response.json(users)

  })
})

userRouter.get('/:id', (request, response) => {
  User.findById(request.params.id).then(user => {
    response.json(user)
  })
})

userRouter.post('/', (request, response) => {
  const body = request.body
 
  if (body.username === undefined) {
    return response.status(400).json({ error: 'username missing' })
  }
  const user = new User({
    username: body.username,
    password: body.password,
  })

  user.save().then(savedUser => {
    response.json(savedUser)
  })

})

module.exports = userRouter