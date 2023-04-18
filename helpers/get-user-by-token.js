const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Get user by jwt jwt.TokenExpiredError
const getUserByToken = async (token) => {
    const decoded = jwt.verify(token, 'nossosecret')

    const userId = decoded.id
    const user = await User.findById(userId).select('-password')
    return user

    try {
    } catch (error) {
        res.status(401).json({ message: 'Acesso Negado' })
    }
}

module.exports = getUserByToken