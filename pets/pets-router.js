const router = require('express').Router({
    mergeParams: true
})
const Pets = require('./pets-model')
const Users = require('../users/users-model')
const Helpers = require('../utils/helpers')

router.post('/', async (req, res, next) => {
    const pet = await Pets.createPet(req, res, req.body)
    res.json(pet)
})

router.get('/:pet_id', async (req, res, next) => {
    try {
        const token = await Helpers.decodedToken(req)
        const pet = await Pets.findPet(token.pet.id)
        res.json(pet)
    }
    catch(err) {
        res.status(500).json(err.stack)
    }
})

router.post('/:pet_id/foods', async (req, res, next) => {
    try {
        const { name, category_id, time_of_day } = req.body
        const food = {
            name,
            category_id
        }
        const cat_name = await Helpers.getCategoryName(category_id) // CHECK\
        const token = await Helpers.decodedToken(req)
        const pet = token.pet
        const added = await Helpers.ateFood(pet, food, cat_name, time_of_day)
        res.status(201).json(added)
    }
    catch(err) {
        res.json(err)
    }
})

router.get('/:pet_id/foods', async (req, res, next) => {
    try {
        const token = await Helpers.decodedToken(req)
        const pet_id = token.pet.id
        const diet = await Pets.getPetsDiet(pet_id)
        res.json(diet)
    }
    catch(err) {
        res.status(400).json(err.stack)
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
        res.status(400).json(err.stack)
    }
})

router.delete('/:pet_id/foods/:food_eaten_id', async (req, res, next) => {
    const deleted = await Helpers.deleteFoodEntry(req.params.food_eaten_id)
    res.json(deleted)
})


module.exports = router