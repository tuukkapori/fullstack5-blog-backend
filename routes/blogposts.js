const express = require('express')
const blogRouter = express.Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = req => {
    const auhtorization = req.get('authorization')
    if (auhtorization && auhtorization.toLowerCase().startsWith('bearer')) {
        return auhtorization.substring(7)
    }

    return null
}


blogRouter.get('/', async (req,res) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})


    res.status(200).json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (req,res) => {
    const body = req.body

    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        return res.status(401).json({error: 'token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)
    
    const post = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: Number(body.likes),
        user: user._id
    })

    savedPost = await post.save()
    user.blogs = user.blogs.concat(savedPost.id)
    await user.save()

    res.json(savedPost)
})

blogRouter.get('/:id', async (req,res) => {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
        res.json(blog.toJSON())
    } else {
        res.status(404).end()
    }
})

blogRouter.delete('/:id', async (req,res) => {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
})


blogRouter.put('/:id', async (req, res) => {
    const body = req.body

    const post = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: Number(body.likes)
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, post, {new: true})
    res.json(updatedBlog.toJSON())
})

module.exports = blogRouter