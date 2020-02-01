
exports.up = function(knex) {
    return knex.schema.createTable('Pets', (table) => {
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
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Pets')
};
