const router = require('express').Router({
    mergeParams: true
})
const db = require('../data/db-config')
const Pets = require('./pets-model')
const Users = require('../users/users-model')
const Helpers = require('../utils/helpers')

router.post('/', async (req, res, next) => {
    const pet = await Pets.createPet(req, res, req.body)
    console.log(pet)
    res.json(pet)
})

router.get('/:pet_id', async (req, res, next) => {
    try {
        const id = req.params.pet_id
        console.log(id)
        const pet = await Pets.findPet(id)
        console.log(pet)
        res.json(pet)
    }
    catch(err) {
        res.status(500).json(err)
    }
})

router.post('/:pet_id/foods', async (req, res, next) => {
    try {
        const { name, category_id } = req.body
        const food = {
            name,
            category_id
        }
        const ToD = req.body.time_of_day
        const categoryId = req.body.category_id // CHECK
        const userFound = await Users.findById(req.params.id) // CHECK
        const petFound = await Pets.findPet(userFound.pet_id) // CHECK
        const cat_name = await Helpers.getCategoryName(categoryId) // CHECK
        const added = await Helpers.ateFood(petFound, food, cat_name, ToD)
        res.status(201).json(added)
    }
    catch(err) {
        next(err)
    }
})

router.get('/:pet_id/foods', async (req, res, next) => {
    try {
        const user = await Users.findById(req.params.id)
        const pet = await Pets.findPet(user.pet_id)
        const diet = await Pets.getPetsDiet(pet.id)
        res.json(diet)
    }
    catch(err) {
        res.status(400).json(err)
    }
})

router.get('/:pet_id/foods/:food_eaten_id', async (req, res, next) => {
    const entry = await Helpers.getFoodEntry(req.params.food_eaten_id)
    res.json(entry)
})

router.put('/:pet_id/foods/:food_eaten_id', async (req, res, next) => { // Can take a name, and time of day, and category.
    try {
        const foodEatenId = req.params.food_eaten_id
        const updated = await Helpers.updateFoodEntry(req.params.pet_id, foodEatenId, req.body)
        res.json(updated)
    }
    catch(err) {
        console.log(err)
    }
})

router.delete('/:pet_id/foods/:food_eaten_id', async (req, res, next) => {
    const deleted = await Helpers.deleteFoodEntry(req.params.food_eaten_id)
    res.json(deleted)
})


module.exports = router