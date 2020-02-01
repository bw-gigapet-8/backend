
exports.up = function(knex) {
    return knex.schema.createTable('Categories', (table) => {
        table.increments('id')
            .notNullable()
        table.string('name')
            .notNullable()
        table.integer('modify_health_by')
            .notNullable()
            .defaultTo(0)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Categories')
};