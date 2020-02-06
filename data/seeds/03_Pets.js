
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Pets').del()
    .then(function () {
      // Inserts seed entries
      return knex('Pets').insert([
        {id: 1, pet_name: 'Pattington'},
        {id: 2, pet_name: 'Hugo'},
        {id: 3, pet_name: 'Marley'},
        {id: 4, pet_name: 'Toots'}
      ]);
    });
};