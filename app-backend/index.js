const express = require('express')
const app = express()
require('dotenv').config()
const User = require('./models/user')


app.use(express.json())
const cors = require('cors')


app.use(cors())
app.use(express.static('build'))


app.get('/api/users', (request, response) => {
  User.find({}).then(users => {
    response.json(users)

  })
})

app.get('/api/users/:id', (request, response) => {
  User.findById(request.params.id).then(user => {
    response.json(user)
  })
})

app.post('/api/users', (request, response) => {
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

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})