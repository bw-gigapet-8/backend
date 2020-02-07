const router = require('express').Router()
const bcrypt = require('bcryptjs')
const Users = require('../users/users-model')
const Pets = require('../pets/pets-model')
const jwt = require('jsonwebtoken')
const secrets = require('../secrets/secret')
const usersRouter = require('../users/users-router')

router.use('/user', usersRouter)

router.post('/register', async (req, res, next) => {
    try {
        let { username, password } = req.body
        const user = await Users.findUserByUsername(username)
        if(username && password) {
            let hash = bcrypt.hashSync(password, 13)
            password = hash
            const added = await Users.addUser(user)
            res.status(201).json(added)
        } else {
            res.status(500).json({
                error: "Must submit a username and password!"
            })
        }
    }
    catch(err) {
        res.status(500).json({
            error: 'This is where things went wrong.',
            more_info: err.stack
        })
    }
})

router.post('/login', async (req, res, next) => {
    try {
        let { username, password } = req.body
        console.log(username)
        const user = await Users.findUserByUsername(username)
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = await signToken(username)
            res.json({
                id: user.id,
                message: `Hello there, ${username}`,
                token
            })
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

async function signToken(username) {
    const user = await Users.findUserByUsername(username)
    const userPet = await Users.findUsersPet(user.id)

    if(user && !userPet) {
        const options = {
            expiresIn: '1d'
        }
    
        const payload = {
            subject: user.id,
            username: user.username,
            password: user.password
        }
        return jwt.sign(payload, secrets.jwtSecret, options)
        
    } else if(user && userPet) {
        const petDiet = await Pets.getPetsDiet(userPet.id)
        const options = {
            expiresIn: '1d'
        }

        const payload = {
            subject: user.id,
            username: user.username,
            password: user.password,
            pet: userPet,
            pet_diet: petDiet
        }
        return jwt.sign(payload, secrets.jwtSecret, options)
    }
}

module.exports = router