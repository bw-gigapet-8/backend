const router = require('express').Router()
const bcrypt = require('bcryptjs')
const Users = require('../users/users-model')
const jwt = require('jsonwebtoken')
const secrets = require('../secrets/secret')
const usersRouter = require('../users/users-router')

router.use('/user', usersRouter)

router.post('/register', async (req, res, next) => {
        const user = req.body
        if(user.username && user.password) {
            const hash = bcrypt.hashSync(user.password, 13)
            user.password = hash

            const added = await Users.addUser(user)
            res.status(201).json(added)
        } else {
            res.status(500).json({
                error: "Must submit a username and password!"
            })
        }
})

router.post('/login', async (req, res, next) => {
    try {
        let { username, password } = req.body
        const user = await Users.findUserByUsername(username)
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = signToken(user)
            res.json({
                id: user.id,
                message: `Hello there, ${username}`,
                token
            })
            return token
        } else {
            res.status(404).json({
                error: `Credentials do not match any user in our Hive Mind. Please try again.`
            })
        }

    }
    catch(err) {
        next(err)
    }
})

function signToken(user) {
        const options = {
        expiresIn: '1d'
    }

    const payload = {
        subject: user.id,
        username: user.username,
        password: user.password
    }

    return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router