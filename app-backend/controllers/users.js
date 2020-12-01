const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/api/users', (request, response) => {
  User.find({}).then(users => {
    response.json(users)

  })
})

usersRouter.get('/api/users/:id', (request, response) => {
  User.findById(request.params.id)
  .then(user => {
    if(user){
      response.json(user)
    }else {
      response.status(404).end()
    }
  })
  .catch(error => {
    console.log(error)
    response.status(400).send({ error: 'malformatted id' })    })
})

usersRouter.post('/api/users', (request, response) => {
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
module.exports = usersRouter