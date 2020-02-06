
exports.up = function(knex) {
    return knex.schema.createTable('Pets', (table) => {
        table.increments('id')
            .notNullable()
        table.string('pet_name')
            .notNullable()
        table.integer('health')
            .notNullable()
            .defaultTo(15)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Pets')
};