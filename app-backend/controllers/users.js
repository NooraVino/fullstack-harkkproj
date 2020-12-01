
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
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

userRouter.post('/', async(request, response) => {
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