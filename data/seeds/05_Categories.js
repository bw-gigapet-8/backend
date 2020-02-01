
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('Categories').insert([
        {id: 1, name: 'Fruits/Veggies', modify_health_by: 3},
        {id: 2, name: 'Sandwhiches', modify_health_by: 1},
        {id: 3, name: 'Fast Food', modify_health_by: -5}
      ]);
    });
};
