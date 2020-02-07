const Users = require('../users/users-model')
const Pets = require('../pets/pets-model')
const jwt_decode = require('jwt-decode')
const db = require('../data/db-config')
const decodeToken = require('jwt-decode')

module.exports = {
    decodedToken,
    checkUser,
    findFood,
    ateFood,
    deleteFoodEntry,
    updateFoodEntry,
    addFood,
    getCategoryName,
    alterHealth,
    getFoodEntry
}

async function findFood(food_id) {
    const food = await db('Foods').where({ id: food_id }).select('*')
    return food[0]
}

async function decodedToken(req) {
        const token = req.headers.authorization
        const decoded = decodeToken(token)
        return decoded
}

async function checkUser(req, res, next) {
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
}

async function ateFood(pet, food_id, tod) {
    try {
        const time_of_day = tod
        const pet_id = pet.id
        console.log(pet_id, food_id, time_of_day)
        const success = await db('Foods_Eaten').insert({ pet_id, food_id, time_of_day })
        console.log(`SUCCESSSS`, success[0])
        return success[0]
    }
    catch(err) {
        return err.stack
    }
}

async function getFoodEntry(food_eaten_id) {
    try {
        const entry = await db('Foods_Eaten').where({ 'Foods_Eaten.id': food_eaten_id })
            .join('Foods', {'Foods.id': 'Foods_Eaten.food_id'})
                .select('Foods.id as food_id', 'Foods.name', 'Foods_Eaten.time_of_day')
        return entry[0]
    }
    catch(err) {
        return err.stack
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
    return foodUpdated[0]
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