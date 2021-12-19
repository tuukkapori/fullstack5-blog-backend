const Blog = require('../models/blog')

const getAllBlogPosts =  async (req, res) => {
    const blogPosts = await Blog.find({})
    res.status(200).json({blogPosts})
}

const createBlogPost = async (req,res) => {
    const blog = new Blog(req.body)

    blog.save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => console.log(error))
}

const getBlogPost = async (req,res) => {
    const blogPost = Blog.findOne({_id: req.params.id})
    if (!blogPost) {
        return res.status(404)
    }

    res.status(200).json({blogPost})
}

const updateBlogPost = async (req,res) => {
    const blogPost = await Blog.findOneAndUpdate({_id: req.params.id}, req.body, {
        new: true
    })

    if (!blogPost) {
        return res.status(404)
    }

    res.status(200).json({blogPost})
}

const deleteBlogPost = async (req,res) => {
    const blogPost = await Blog.findOneAndDelete({_id: req.params.id})

    if (!blogPost) {
        return res.status(404)

    }

    res.status(200).json({blogPost})

}



module.exports = {getAllBlogPosts, createBlogPost, getBlogPost, updateBlogPost, deleteBlogPost}