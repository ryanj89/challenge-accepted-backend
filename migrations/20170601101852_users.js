
exports.up = knex => {
  return knex.schema.createTable('users', t => {
    t.increments();
    t.string('email').unique();
    t.string('username').unique();
    t.integer('points').defaultTo(0);
    t.integer('challenges_completed').defaultTo(0);
    t.integer('total_challenges').defaultTo(0);
    t.integer('challenges_given').defaultTo(0);
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('users');
};
