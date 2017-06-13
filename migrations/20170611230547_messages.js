exports.up = knex => {
  return knex.schema.createTable('messages', t => {
    t.increments();
    t.string('message');
    t.string('name');
    t.integer('user').references('id').inTable('users').onDelete('CASCADE');
    t.integer('room').references('id').inTable('challenges').onDelete('CASCADE');
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('messages');
};
