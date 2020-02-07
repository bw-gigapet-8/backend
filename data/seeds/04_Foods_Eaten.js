
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Foods_Eaten').del()
    .then(function () {
      // Inserts seed entries
      return knex('Foods_Eaten').insert([
        {id: 1, pet_id: 3, food_id: 2},
        {id: 2, pet_id: 1, food_id: 2},
        {id: 3, pet_id: 1, food_id: 3},
        {id: 4, pet_id: 2, food_id: 1}
      ]);
    });
};