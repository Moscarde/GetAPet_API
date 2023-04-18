const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class UserController {
    static async register(req, res) {
        const { name, email, phone, password, confirmPassword } = req.body

        // Validations
        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório!' })
            return
        }
        if (!email) {
            res.status(422).json({ message: 'O email é obrigatório!' })
            return
        }
        if (!phone) {
            res.status(422).json({ message: 'O telefone é obrigatório!' })
            return
        }
        if (!password) {
            res.status(422).json({ message: 'A senha é obrigatória!' })
            return
        }
        if (!confirmPassword) {
            res.status(422).json({ message: 'A confirmação de senha é obrigatória!' })
            return
        }
        if (password !== confirmPassword) {
            res.status(422).json({ message: 'A senha e a confirmação de senha precisam ser iguais!' })
            return
        }

        // Check if user exists
        const userExists = await User.findOne({ email: email })

        if (userExists) {
            res.status(422).json({ message: 'Por favor, utilize outro e-mail' })
            return
        }

        // Create a password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        // Create a user
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash
        })

        try {
            const newUser = await user.save()
            await createUserToken(newUser, req, res)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    static async login(req, res) {
        const { email, password } = req.body

        // Validations
        if (!email) {
            res.status(422).json({ message: 'O email é obrigatório!' })
            return
        }
        if (!password) {
            res.status(422).json({ message: 'A senha é obrigatória!' })
            return
        }

        // Check if user exists
        const user = await User.findOne({ email: email })

        if (!user) {
            res.status(422).json({ message: 'Não há usuário cadastrado com esse email!' })
            return
        }

        // Check if password match with db password
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            res.status(422).json({ message: 'Senha inválida' })
            return
        }

        // Create authentication token
        await createUserToken(user, req, res)


    }

    static async checkUser(req, res) {
        let currentUser

        if (req.headers.authorization) {
            const token = getToken(req)
            try {
                const decoded = jwt.verify(token, 'nossosecret')
                currentUser = await User.findById(decoded.id)
                currentUser.password = undefined
            } catch (error) {
                res.status(404).json({ message: 'Token inválido' })
            }
        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }

    static async getUserById(req, res) {
        const id = req.params.id

        try {
            const user = await User.findById(id).select('-password')
            res.status(200).json({ user })
        } catch (error) {
            res.status(422).json({ message: 'Usuário não encontrado', error })
        }


    }

    static async editUser(req, res) {
        // Check if user exists
        const token = getToken(req)
        const user = await getUserByToken(token)
        // Validations
        const { name, email, phone, password, confirmPassword } = req.body

        // Verify if has image
        if (req.file) {
            user.image = req.file.filename
        }

        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório!' })
            return
        }
        user.name = name

        if (!email) {
            res.status(422).json({ message: 'O email é obrigatório!' })
            return
        }

        // check if email has already taken
        const userExists = await User.findOne({ email: email })

        if (user.email !== email && userExists) {
            res.status(422).json({ message: 'Email em uso' })
            return
        }
        user.email = email

        if (!phone) {
            res.status(422).json({ message: 'O telefone é obrigatório!' })
            return
        }
        user.phone = phone

        if (password !== confirmPassword) {
            res.status(422).json({ message: 'A senha e a confirmação de senha precisam ser iguais!' })
            return
        }
        else if (password === confirmPassword && password != null) {
            // Create a password
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)
            user.password = passwordHash
        }

        try {
            // Return user updated data
            await User.findOneAndUpdate(
                { _id: user._id },
                { $set: user },
                { new: true }
            )
            res.status(200).json({ message: 'Usuário atualizado com sucesso' })
        }
        catch (error) {
            res.status(500).json({ message: error })
        }
    }

}