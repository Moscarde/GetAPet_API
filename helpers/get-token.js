const getToken = (req) => {
    if (!req.headers.authorization) {
        res.status(422).json({message: 'Acesso negado'})
    }
    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1]
    return token
}

module.exports = getToken