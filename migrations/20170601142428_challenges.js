
exports.up = knex => {
  return knex.schema.createTable('challenges', t => {
    t.increments();
    t.string('name').notNullable();
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('challenges');
};
