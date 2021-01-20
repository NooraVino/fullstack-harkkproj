const giftRouter = require('express').Router()
const Gift = require('../models/gift')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

giftRouter.get('/', (request, response, next) => {
  Gift.find({}).then(gifts => {
    response.json(gifts)
  })
})

giftRouter.put('/:id', async (request, response) => {
  
  try {
    const { body } = request
    const updGift = await Gift.findById(request.params.id)
  
    updGift.givers = body.givers
    console.log(body)
    const g = await updGift.save()
   
    response.json(g.toJSON())

  } catch (exception) {

  }
})

giftRouter.post('/', async (request, response) => {
  const body = request.body
  console.log(body)

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }
  const user = await User.findById(body.id)

  const gift = new Gift({
    name: body.name,
    content: body.content,
    url: body.url,
    user: user._id
  })

  try {
    const savedGift = await gift.save()
    user.gifts = user.gifts.concat(savedGift._id)
    await user.save()
    response.json(savedGift)
  } catch (exception) {
    return response.status(400).json({ error: 'name missing' })
  }

})

module.exports = giftRouter


