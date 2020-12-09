const mongoose = require('mongoose')

const giftSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 1,
    required: true,
  },
  content: {
    type: String,
  },
  url: [{
    type: String
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

giftSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Gift', giftSchema)