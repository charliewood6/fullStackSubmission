const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    let total = 0

    if (blogs.length === 0) {
        return 0
    } else if (blogs.length === 1) {
        return blogs[0].likes
    }

    blogs.forEach((blog) => {
        total += blog.likes
    })
    return total
}

const favoriteBlog = (blogs) => {
    let favorite = {
        title: "",
        author: "",
        likes: 0
    }

    if (blogs.length === 0) {
        return 0
    } else if (blogs.length === 1) {
        return blogs[0]
    }
    blogs.forEach((blog) => {
        if (blog.likes > favorite.likes){
            favorite = blog
        }
    })
    return favorite
}

const mostBlogs = (blogs) => {
    let mostBlogs = []
    let mostWritten = {author: "", blogs: 0}
    let added = false

    if (blogs.length === 0) {
        return 0
    } else if (blogs.length === 1) {
        return {author: blogs[0].author, blogs: 1}
    }

    blogs.forEach((blog) => {
        for (let i = 0; i < mostBlogs.length; i++){
            if (blog.author === mostBlogs[i].author) {
                mostBlogs[i].blogs += 1
                added = true
                break
            }
        }
        if (!added){
            mostBlogs.push({author: blog.author, blogs: 1})
        }
        added = false
    })
    mostBlogs.forEach((author) => {
        if (author.blogs > mostWritten.blogs){
            mostWritten = author
        }
    })
    return mostWritten
}

const mostLikes = (blogs) => {
    let mostLikes = []
    let bestAuthor = {author: "", likes: 0}
    let added = false

    if (blogs.length === 0) {
        return 0
    } else if (blogs.length === 1) {
        return {author: blogs[0].author, likes: blogs[0].likes}
    }

    blogs.forEach((blog) => {
        for (let i = 0; i < mostLikes.length; i++){
            if (blog.author === mostLikes[i].author) {
                mostLikes[i].likes += blog.likes
                added = true
                break
            }
        }
        if (!added){
            mostLikes.push({author: blog.author, likes: blog.likes})
        }
        added = false
    })
    mostLikes.forEach((author) => {
        if (author.likes > bestAuthor.likes){
            bestAuthor = author
        }
    })
    return bestAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }