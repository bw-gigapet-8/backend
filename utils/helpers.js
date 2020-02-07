const Users = require('../users/users-model')
const Pets = require('../pets/pets-model')
const jwt_decode = require('jwt-decode')
const db = require('../data/db-config')
const timestamp = require('time-stamp')

module.exports = {
    checkUser,
    ateFood,
    deleteFoodEntry,
    updateFoodEntry,
    addFood,
    getCategoryName,
    alterHealth,
    getFoodEntry
}

async function checkUser(req, res, next) {
    const user = await Users.findById(req.params.id)
    console.log(user)
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
}

async function ateFood(pet, food_name, category_name, tod) {
    const time_of_day = tod
    const category = await db('Categories').where({ name: category_name }).first()
    const category_id = category.id
    const pet_id = pet.id
    const food_id = await addFood(food_name)

    const success = await db('Foods_Eaten').insert({ pet_id, food_id, time_of_day })
    return success
}

async function getFoodEntry(food_eaten_id) {
    try {
        const entry = await db('Foods_Eaten').where({ 'Foods_Eaten.id': food_eaten_id })
            .join('Foods', {'Foods.id': 'Foods_Eaten.food_id'})
                .select('Foods.id as food_id', 'Foods.name', 'Foods_Eaten.time_of_day')
        return entry
    }
    catch(err) {
        console.log(err)
    }
}

async function deleteFoodEntry(food_eaten_id) {
    const deleted = await db('Foods_Eaten').where({ id: food_eaten_id }).del()
    return deleted
}

async function updateFoodEntry(pet_id, food_eaten_id, changes) {
    const { name, category_id, time_of_day } = changes
    const food = {
        name,
        category_id
    }
    const newFood = await addFood(food)
    const foodUpdated = await db('Foods_Eaten').where({ id: food_eaten_id }).update({ food_id: newFood, time_of_day })
    return foodUpdated
}

async function addFood(food) {
    const id = await db('Foods').insert(food)
    return id[0]
}

async function getCategoryName(id) {
    const name = await db('Categories').where({ id }).first().select('name')
    return name.name
}

async function alterHealth(pet_id, modifier) { // Not in use yet
    const pet = Pets.findPet(pet_id)
}