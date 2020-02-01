const knex = require('knex')
const config = require('../knexfile')

const db_env = process.env.DB_ENV || 'development'

const db = knex(config[db_env])

module.exports = db