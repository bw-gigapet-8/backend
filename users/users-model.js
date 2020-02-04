const db = require('../data/db-config')


module.exports = {
    addUser,
    findUserByUsername,
    getAllUsers,
    findById
}

async function addUser(user) {
    const registered = await db('users').insert(user)
    const createdUser = await findById(registered[0])
    return createdUser
}

async function findUserByUsername(username) {
    const user = await db('users').where({ username }).select('id', 'username', 'password')
    return user[0]
}

async function getAllUsers() {
    const users = await db('Users')
    return users
}

async function findById(id) {
    const user = await db('users').first().where({ id }).select('id', 'username', 'password')
    return user
}