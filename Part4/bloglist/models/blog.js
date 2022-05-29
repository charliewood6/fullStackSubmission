const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    author: String,
    url: {
      type: String,
      required: true
    },
    likes: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  })
  
const Blog = mongoose.model('Blog', blogSchema)
  
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const mongoUrl = 'mongodb+srv://fullstack:fullstack2022@cluster0.0jpaq.mongodb.net/blogListApp?retryWrites=true&w=majority'
mongoose.connect(mongoUrl)

module.exports = mongoose.model('Blog', blogSchema)
