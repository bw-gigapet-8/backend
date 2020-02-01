
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Foods').del()
    .then(function () {
      // Inserts seed entries
      return knex('Foods').insert([
        {id: 1, name: 'Taco', category_id: 3},
        {id: 2, name: 'Sandwich', category_id: 2},
        {id: 3, name: 'Fruit Bowl', category_id: 1}
      ]);
    });
};