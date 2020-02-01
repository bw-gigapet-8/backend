exports.seed = async function(knex) {
  // Deletes ALL existing entries
    await knex("Foods").truncate();
    await knex("Foods_Eaten").truncate();
    await knex("Categories").truncate();
    await knex("Users").truncate();
    await knex("Pets").truncate();
};