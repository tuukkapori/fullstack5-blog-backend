const express = require('express')
const deleteRouter = express.Router()
const Blog = require('../models/blog')

deleteRouter.delete('/', async (req,res) => {
    await Blog.remove({})
    res.status(204).end()
})

module.exports = deleteRouter