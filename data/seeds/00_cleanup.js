exports.seed = async function(knex) {
  // Deletes ALL existing entries
    await knex("Foods").del();
    await knex("Foods_Eaten").del();
    await knex("Categories").del();
    await knex("Users").del();
    await knex("Pets").del();
};