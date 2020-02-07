const express = require('express')
const router = express.Router()
const Users = require('./users-model')
const Helpers = require('../utils/helpers')
const petRouter = require('../pets/pets-router')

router.use('/:id/pet', petRouter)

router.get('/', async (req, res, next) => {
    const users = await Users.getAllUsers()
    res.json({users})
})

router.get('/:id', async (req, res, next) => {
    Helpers.checkUser(req, res, next)
    const token = await Helpers.decodedToken(req)
    const username = token.username
    console.log(username)
    const user = Users.findUserByUsername
})

module.exports = router