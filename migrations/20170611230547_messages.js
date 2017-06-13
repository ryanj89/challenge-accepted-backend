exports.up = knex => {
  return knex.schema.createTable('messages', t => {
    t.increments();
    t.string('message')
    t.integer('u_id').references('id').inTable('users').onDelete('CASCADE');
    t.integer('c_id').references('id').inTable('challenges').onDelete('CASCADE');
    t.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('messages');
};
