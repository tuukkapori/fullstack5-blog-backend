const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const db_helper = require('../utils/db_helper')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(db_helper.initialblogs)
})



test('blogs are returned as json', async () => {
    await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
})

describe('adding a blogpost', () => {
    test('succeed with valid data', async () => {
        const newBlog = {
            title: "supertesti",
            author: "tukeshow",
            url: "enmuista",
            likes: 12
        }

        await api.post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await db_helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(db_helper.initialblogs.length + 1)
    })
})

afterAll(() => {
    mongoose.connection.close()
})