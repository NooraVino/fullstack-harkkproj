const express = require('express')
const app = express()
require('dotenv').config()
const User = require('./models/user')





app.use(express.json())
const cors = require('cors')


app.use(cors())
app.use(express.static('build'))




app.get('/api/users', (req, response) => {
  User.find({}).then(users => {
    response.json(users)

  })
})

app.post('/api/users', (request, response) => {
  const user = request.body
  console.log(user)

  response.json(user)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})