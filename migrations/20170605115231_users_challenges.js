// USER_CHALLENGE (many to many)
// (FK) User id: number
// (FK) Challenge id: number
// Status: string (pending, completed, failed)
exports.up = knex => {
  return knex.schema.createTable('users_challenges', t => {
    t.integer('u_id').references('id').inTable('users').onDelete('CASCADE');
    t.integer('c_id').references('id').inTable('challenges').onDelete('CASCADE');
    t.integer('submission_score').notNullable().defaultTo(0);
    t.string('status').notNullable().defaultTo('pending');
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('users_challenges');
};
