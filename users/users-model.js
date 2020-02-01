const db = require('../data/db-config')

module.exports = {
    getAllUsers
}

async function getAllUsers() {
    const users = await db('Users')
    return users
}