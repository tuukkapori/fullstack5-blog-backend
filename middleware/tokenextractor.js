const tokenExtractor = (req,res,next) => {
    const auhtorization = req.get('authorization')
    if (auhtorization && auhtorization.toLowerCase().startsWith('bearer')) {
        return auhtorization.substring(7)
    }

    next()
}

module.exports = tokenExtractor