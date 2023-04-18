const jwt = require('jsonwebtoken')
const getToken = require('./get-token')

// Middleware to validate token
const checkToken = (req, res, next) => {
    console.log(req.headers)
    if (!req.headers.authorization) {
        return res.status(401).json({message: 'Acesso Negado - sem header / auth'})   
    }

    const token = getToken(req)

    if (!token) {
        return res.status(401).json({message: 'Acesso negado'})
    }

    try {
        const verified = jwt.verify(token, 'nossosecret')
        req.user = verified
        next()
    } catch (err) {
        return res.status(401).json({message: 'Token Invalido!'})
    }
}

module.exports = checkToken