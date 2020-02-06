const router = require('express').Router({
    mergeParams: true
})
const db = require('../data/db-config')
const Pets = require('./pets-model')
const Users = require('../users/users-model')
const Helpers = require('../utils/helpers')

router.post('/', async (req, res, next) => {
    const pet = await Pets.createPet(req, res, req.body)
    res.json(pet)
})

router.get('/', async (req, res, next) => {
    const id = req.params.id
    const pet = await Pets.findPet(id)
    res.json(pet)
})

router.post('/foods', async (req, res, next) => {
    try {
        const { name, category_id } = req.body
        const food = {
            name,
            category_id
        }
        const ToD = req.body.time_of_day
        console.log(food)
        const categoryId = req.body.category_id // CHECK
        const userFound = await Users.findById(req.params.id) // CHECK
        const petFound = await Pets.findPet(userFound.pet_id) // CHECK
        const cat_name = await Helpers.getCategoryName(categoryId) // CHECK
        const added = await Helpers.ateFood(petFound, food, cat_name, ToD)
        res.status(201).json(added)
    }
    catch(err) {
        console.log(err)
    }
})

module.exports = router