const Users = require('../users/users-model')
const jwt_decode = require('jwt-decode')
const db = require('../data/db-config')

module.exports = {
    checkUser,
    ateFood,
    addFood,
    getCategoryName
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

async function ateFood(pet, food_name, category_name, tod) {
    const time_of_day = tod
    const category = await db('Categories').where({ name: category_name }).first()
    const category_id = category.id
    const pet_id = pet.id
    const food_id = await addFood(food_name)

    const success = await db('Foods_Eaten').insert({ pet_id, food_id, time_of_day })
    return success
}

async function addFood(food) {
    const id = await db('Foods').insert(food)
    return id[0]
}

async function getCategoryName(id) {
    const name = await db('Categories').where({ id }).first().select('name')
    return name.name
}