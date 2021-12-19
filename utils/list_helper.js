const dummy = (blogs) => {
   return 1 
}

const totalLikes = (blogs) => {
    var likes = 0

    blogs.forEach(blog => likes += blog.likes)

    return likes
}

const favoriteBlog = (blogs) => {
    const mostLikes = blogs.reduce((prev, current) => {
        return (prev.likes > current.likes) ? prev: current
    })

    return mostLikes
}

const mostBlogs = (blogs) => {

    // make an empty array for authors and add authors to it, only once
    var authors = []
    blogs.forEach(blog => {
        if (authors.some(author => author === blog.author)) {
            // do nothing
        } else {
            authors = authors.concat(blog.author)
        }
    })
    var authorsWithPosts = []

    console.log(authors)

    for (let a = 0; a < authors.length; a++ ) {
        var posts = 0
        console.log(authors[a])
        
        for (let b = 0; b < blogs.length; b++ ) {
            
            if (blogs[b].author === authors[a]) {
                posts +=1
            }
        }
        authorsWithPosts = authorsWithPosts.concat({author: authors[a], blogs: posts})
        console.log(authorsWithPosts)
        
    }

    console.log(authorsWithPosts)

    const authorWithMostBlogs = authorsWithPosts.reduce((prev, current) => {
        return (prev.blogs > current.blogs) ? prev : current
    })

    console.log(authorWithMostBlogs)

    return authorWithMostBlogs
}

const mostLikes = (blogs) => {

    var authors = []

    blogs.forEach(blog => {
        if (authors.some(a => a === blog.author)) {
            //do nothing
        } else {
            authors = authors.concat(blog.author)
        }
    })

    console.log(authors)
    var authorsWithLikes = []

    for (let a = 0; a < authors.length; a++) {
        var likes = 0
        for (let b = 0; b < blogs.length; b++) {
            if (blogs[b].author === authors[a]) {
                likes += blogs[b].likes
            }
        }

        authorsWithLikes = authorsWithLikes.concat({author: authors[a], likes: likes})
    }

    const authorWithMostLikes = authorsWithLikes.reduce((prev,current) => {
        return (prev.likes > current.likes) ? prev : current
    })

    console.log(authorWithMostLikes)

    return authorWithMostLikes
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}