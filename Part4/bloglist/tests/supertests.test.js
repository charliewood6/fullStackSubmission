const supertest = require('supertest')
const express = require('express')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()
})

describe('when there is initially blogs saved', () => {
  test('correct amount of blogs', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
        
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier is named id', async () => {
    const response = await api.get('/api/blogs')
    for (var blog of response.body){
      expect(blog.id).toBeDefined()
    }
  })
})

describe('adding a new blog', () => {
  test('adding new blog successfully', async () => {
    const newBlog = {
      title: "Test Blog",
      author: "Test Wiliams",
      url: "www.testblog.com",
      likes: 150
    }
  
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
    const finalBlogs = await helper.blogsInDb()
    expect(finalBlogs).toHaveLength(helper.initialBlogs.length + 1)
  
    const titles = finalBlogs.map(blog => blog.title)
    expect(titles).toContain(
      'Test Blog'
    )
  })

  test('if no likes property, default to 0', async () => {
    const blogWithNoLikes = {
      title: "No Likes Blog",
      author: "No Likes Wiliams",
      url: "www.nolikesblog.com"
    }
  
    await api
    .post('/api/blogs')
    .send(blogWithNoLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
    const finalBlogs = await helper.blogsInDb()
    expect(finalBlogs).toHaveLength(helper.initialBlogs.length + 1)
  
    expect(finalBlogs[3].likes).toBe(0)
  }, 100000)
  
  test('if no title and url, respond with bad request status code 400', async () => {
    const blogWithNoTitleAndUrl = {
      author: "No Likes Wiliams",
      likes: 10
    }
  
    await api
    .post('/api/blogs')
    .send(blogWithNoTitleAndUrl)
    .expect(400)
  })
})

describe('deleting a blog', () => {
  test('if id is valid succeeds with status code 200', async () => {
    const startingBlogs = await helper.blogsInDb()
    const blogToDelete = startingBlogs[0]

    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(200)

    const endingBlogs = await helper.blogsInDb()

    expect(endingBlogs).toHaveLength(helper.initialBlogs.length - 1)

    const titles = endingBlogs.map(blog => blog.title)
    expect(titles).not.toContain(
      blogToDelete.title
    )
  })
})

describe('updating a blog', () => {
  test('if id is valid blog updates successfully with status code 204', async () => {
    const startingBlogs = await helper.blogsInDb()
    const blogToUpdate = startingBlogs[0]
    blogToUpdate.title = "Updated Title"

    await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(204)

    const endingBlogs = await helper.blogsInDb()
    const titles = endingBlogs.map(blog => blog.title)
    expect(titles).toContain(
      blogToUpdate.title
    )
    expect(titles).not.toContain(
      helper.initialBlogs[0].title
    )
  })
})

afterAll(() => {
  mongoose.connection.close()
})