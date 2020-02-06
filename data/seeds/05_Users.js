const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Users').del()
    .then(function () {
      // Inserts seed entries
      return knex('Users').insert([
        {id: 1, username: 'Cole', pet_id: 2, password: bcrypt.hashSync('password1', 10), token: 'fo3h435u98435nc47096n69702362876c08924576928c'},
        {id: 2, username: 'Brittany', pet_id: 3, password: bcrypt.hashSync('password2', 10), token: '86029h45703fh6oi354gh7po3h457h3567g3hg73'},
        {id: 3, username: 'Tyler', pet_id: 4, password: bcrypt.hashSync('password3', 10), token: 'k4h6l435h54kj73l57b54lk73blu573n5k7b3kb6'}
      ]);
    });
};