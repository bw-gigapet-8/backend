const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Users').del()
    .then(function () {
      // Inserts seed entries
      return knex('Users').insert([
        {id: 1, username: 'Cole', pet_id: 2, password: bcrypt.hashSync('password1', 10)},
        {id: 2, username: 'Brittany', pet_id: 3, password: bcrypt.hashSync('password2', 10)},
        {id: 3, username: 'Tyler', pet_id: 4, password: bcrypt.hashSync('password3', 10)}
      ]);
    });
};