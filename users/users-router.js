const express = require('express')
const router = express.Router()
const Users = require('./users-model')
const jwt_decode = require('jwt-decode')

router.get('/', async (req, res, next) => {
    const users = await Users.getAllUsers()
    res.json({users})
})

router.get('/:id', async (req, res, next) => {
    const user = await Users.findById(req.params.id)
    const token = req.headers.authorization
    const decoded = jwt_decode(token)
    console.log(user, token, decoded)
})


module.exports = router