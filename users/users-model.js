const db = require('../data/db-config')

module.exports = {
    getAllUsers
}

async function getAllUsers() {
    const users = await db('users')
    return users
}