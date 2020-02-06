const db = require('../data/db-config')


module.exports = {
    addUser,
    findUserByUsername,
    getAllUsers,
    findById,
    findUsersPet
}

async function addUser(user) {
    const registered = await db('Users').insert(user)
    const createdUser = await findById(registered[0])
    return createdUser
}

async function findUserByUsername(username) {
    const user = await db('Users').where({ username }).select('id', 'username', 'password')
    return user[0]
}

async function getAllUsers() {
    const users = await db('Users')
    return users
}

async function findById(id) {
    const user = await db('Users').where({ id }).first().select('id', 'username', 'pet_id')
    return user
}

async function findUsersPet(user_id) {
    const user = findById(user_id)
    
}