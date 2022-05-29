const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (typeof request.body.password == 'undefined'){
    return response.status(400).json({error: 'Password is missing'})
  }
  else if (typeof request.body.username == 'undefined'){
    return response.status(400).json({error: 'Username is missing'})
  }
  else if (request.body.username.length < 3){
      return response.status(400).json({error: 'username is under 3 characters'})
  }
  else if (request.body.password.length < 3){
    return response.status(400).json({error: 'password is under 3 characters'})
  }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  
  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users)
  })



module.exports = usersRouter
