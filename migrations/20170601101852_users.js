// USER
// (PK) id: number
// Email: string
// Name: string
// Score: number
// Created at: date
exports.up = knex => {
  return knex.schema.createTable('users', t => {
    t.increments();
    t.string('email').unique().notNullable();
    t.string('name').notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.integer('score').defaultTo(0);
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('users');
};
