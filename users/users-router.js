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
    if(!user || !token) {
        res.status(404).json({
            error: `No user found.`
        })
    } else {
        if(user.password === decoded.password) {
            res.status(200).json(user)
        } else {
            res.status(400).json({
                error: `Request denied. This is not your profile!`
            })
        }
    }
})


module.exports = router