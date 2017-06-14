exports.up = knex => {
  return knex.schema.createTable('users', t => {
    t.increments();
    t.string('email').unique().notNullable();
    t.string('name').notNullable();
    t.string('picture');
    t.string('role').notNullable().defaultTo('user');
    t.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('users');
};