const giftRouter = require('express').Router()
const Gift = require('../models/gift')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

giftRouter.get('/', (request, response, next) => {
  Gift.find({}).then(gifts => {
    response.json(gifts)
  })
})

giftRouter.post('/', async (request, response) => {
  const body = request.body
 
  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }
  const user = await User.findById(body.userId)

  const gift = new Gift({
    name: body.name,
    content: body.content,
    url: body.url,
    user: user._id
  })

  const savedGift = await gift.save()

  user.gifts = user.gifts.concat(savedGift._id)
  await user.save()


  response.json(savedGift)


})

module.exports = giftRouter


