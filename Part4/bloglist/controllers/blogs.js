const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return(authorization.substring(7))
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (typeof body.likes == 'undefined'){
    body.likes = 0
  }
  if (typeof body.url == 'undefined' || typeof body.title == 'undefined'){
    return response.status(400).json({error: 'Bad request'})
  }

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({error: 'token missing or invalid'})
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result.id)
  return response.status(201).json(result)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    if (blog){
      return response.json(blog)
    } else {
      return response.status(404).end()
    }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(200).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updated = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
  response.status(204).json(updated)
})

module.exports = blogsRouter
