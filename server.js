const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const UsersRouter = require('./users/users-router')
const authRouter = require('./auth/auth-router')
const authenticator = require('./auth/auth-middleware')

const server = express()

server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/users', authenticator, UsersRouter)
server.use('/auth', authRouter)

server.get('/', (req, res, next) => {
    res.json({
        Welcome_Message: `Hello! Welcome to the GigaPet Database!`
    })
})

module.exports = server