exports.up = knex => {
  return knex.schema.createTable('submissions', t => {
    t.increments();
    t.integer('u_id').references('id').inTable('users');
    t.integer('c_id').references('id').inTable('challenges');
    t.string('submission').notNullable();
    t.string('resource_type').notNullable();
    t.text('details').nullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.integer('score').notNullable().defaultTo(0);
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('submissions');
};
