
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Pets').del()
    .then(function () {
      // Inserts seed entries
      return knex('Pets').insert([
        {id: 1, name: 'Pattington'},
        {id: 2, name: 'Hugo'},
        {id: 3, name: 'Marley'}
      ]);
    });
};