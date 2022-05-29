const Blog = require('../models/blog')

const initialBlogs = [
    {
      title: "My Blog",
      author: "C Wood",
      url: "www.myblog.com",
      likes: 10
    },
    {
      title: "Best Blog",
      author: "H Wood",
      url: "www.bestblog.com",
      likes: 100
    },
    {
      title: "Worst Blog",
      author: "T Wood",
      url: "www.worstblog.com",
      likes: 1
    },
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
}