// FRIENDSHIP
// (FK) user1 id: number
// (FK) User2 id: number
exports.up = knex => {
  return knex.schema.createTable('friendships', t => {
    t.integer('u_id').references('id').inTable('users').onDelete('CASCADE');
    t.integer('f_id').references('id').inTable('users').onDelete('CASCADE');
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('friendships');
};
