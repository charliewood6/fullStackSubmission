const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      minlength: 3
    },
    name: {
      type: String,
      required: true,
      minlength: 3
    },
    passwordHash: String,
    blogs: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Blog'
    }
  })
  
const User = mongoose.model('User', userSchema)
  
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const mongoUrl = 'mongodb+srv://fullstack:fullstack2022@cluster0.0jpaq.mongodb.net/blogListApp?retryWrites=true&w=majority'
mongoose.connect(mongoUrl)

module.exports = mongoose.model('User', userSchema)