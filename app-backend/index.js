const express = require('express')
const app = express()

let users = [  {    id: 1,    username: "testi",   password: "testi"  }, {    id: 2,    username: "noora",   password: "password"  }  ]

app.use(express.json()) 
const cors = require('cors')

app.use(cors())


app.get('/api/users', (req, res) => {
  res.json(users)
})

app.post('/api/users', (request, response) => {
  const user = request.body
  console.log(user)

  response.json(user)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})