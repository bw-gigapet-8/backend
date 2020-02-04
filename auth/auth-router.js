const router = require('express').Router()
const bcrypt = require('bcryptjs')
const Users = require('../users/users-model')
const jwt = require('jsonwebtoken')
const db = require('../data/db-config')

router.post('/register', async (req, res, next) => {
    try {
        const user = req.body
        if(user.username && user.password) {
            const hash = bcrypt.hashSync(user.password, 13)
            user.password = hash

            const added = await Users.addUser(user)
            console.log(added)
            res.status(201).json(added)
        } else {
            res.status(500).json({
                error: "Must submit a username and password!"
            })
        }
    }
    catch(err) {
        next(err)
    }
})

router.post('/login', async (req, res, next) => {
    try {
        let { username, password } = req.body
        const user = await Users.findUserByUsername(username)
        if(user[0] && bcrypt.compareSync(password, user[0].password)) {
            const token = signToken(user)
            res.json({
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
        username: user.username
    }

    return jwt.sign(payload, 'my spidey sense is tingling', options)
}

module.exports = router