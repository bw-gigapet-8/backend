const express = require('express')
const router = express.Router()
const Users = require('./users-model')

router.get('/', async (req, res, next) => {
    const users = await Users.getAllUsers()
    res.json({users})
})



module.exports = router