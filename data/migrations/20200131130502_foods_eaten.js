
exports.up = function(knex) {
    return knex.schema.createTable('Foods_Eaten', (table) => {
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
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Foods_Eaten')
};
