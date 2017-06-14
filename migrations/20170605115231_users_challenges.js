exports.up = knex => {
  return knex.schema.createTable('users_challenges', t => {
    t.integer('u_id').references('id').inTable('users').onDelete('CASCADE');
    t.integer('c_id').references('id').inTable('challenges').onDelete('CASCADE');
    t.boolean('voted').defaultTo(false);
    t.string('status').notNullable().defaultTo('pending');
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('users_challenges');
};
