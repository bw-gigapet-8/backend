
exports.up = function(knex) {
    return knex.schema.createTable('Foods', (table) => {
        table.increments('id')
            .notNullable()
        table.string('name')
            .notNullable()
        table.integer('category_id')
            .notNullable()
            .references('id')
            .inTable('Categories')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Foods')
};
