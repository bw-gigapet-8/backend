const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const UsersRouter = require('./users/users-router')

const server = express()

server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/users', UsersRouter)

server.get('/', (req, res, next) => {
    res.json({
        Welcome_Message: `Hello! Welcome to the GigaPet Database!`
    })
})

const PORT = process.env.PORT || 4321

if(!module.parent) {
    server.listen(PORT, () => {
        console.log(`### Server is listening on ${PORT}! ###`)
    })
}