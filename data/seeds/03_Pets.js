
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Pets').del()
    .then(function () {
      // Inserts seed entries
      return knex('Pets').insert([
        {id: 1, name: 'Pattington', foods_eaten_id: 3},
        {id: 2, name: 'Hugo', foods_eaten_id: 1},
        {id: 3, name: 'Marley', foods_eaten_id: 2}
      ]);
    });
};