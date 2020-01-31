
exports.up = async function(knex) {
    await knex.schema.createTable('Users', (table) => {
        table.increments('id')
            .notNullable()
        table.string('username')
            .notNullable()
        table.integer('pet_id')
            .references('id')
            .inTable('Pets')
        table.string('token')
            .notNullable()
        table.boolean('profileCompleted')
            .notNullable()
            .defaultTo(0)
    })

    await knex.schema.createTable('Pets', (table) => {
        table.increments('id')
            .notNullable()
        table.string('name')
            .notNullable()
        table.integer('health')
            .notNullable()
            .defaultTo(15)
        table.integer('foods_eaten_id')
            .references('id')
            .inTable('Foods_Eaten')
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('Users')
    })

    await knex.schema.createTable('Foods_Eaten', (table) => {
        table.increments('id')
            .notNullable()
        table.integer('pet_id')
            .notNullable()
            .references('id')
            .inTable('Pets')
        table.integer('food_id')
            .notNullable()
            .references('id')
            .inTable('Foods')
        table.string('time_of_day')
            .notNullable()
    })

    await knex.schema.createTable('Foods', (table) => {
        table.increments('id')
            .notNullable()
        table.string('name')
            .notNullable()
        table.integer('category_id')
            .notNullable()
            .references('id')
            .inTable('Categories')
    })

    await knex.schema.createTable('Categories', (table) => {
        table.increments('id')
            .notNullable()
        table.string('name')
            .notNullable()
        table.integer('modify_health_by')
            .notNullable()
            .defaultTo(0)
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('Categories')
    await knex.schema.dropTableIfExists('Foods')
    await knex.schema.dropTableIfExists('Foods_Eaten')
    await knex.schema.dropTableIfExists('Pets')
    await knex.schema.dropTableIfExists('Users')
};
