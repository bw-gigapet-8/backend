
exports.up = function(knex) {
    return knex.schema.createTable('Users', (table) => {
        table.increments('id')
            .notNullable()
        table.string('username')
            .notNullable()
        table.string('password')
            .notNullable()
        table.integer('pet_id')
            .references('id')
            .inTable('Pets')
        table.string('token')
        table.boolean('profileCompleted')
            .notNullable()
            .defaultTo(0)
    })
};

exports.down = async function(knex) {
    return knex.schema.dropTableIfExists('Users')
};
