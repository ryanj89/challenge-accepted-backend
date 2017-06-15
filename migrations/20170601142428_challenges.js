exports.up = knex => {
  return knex.schema.createTable('challenges', t => {
    t.increments();
    t.string('name').notNullable();
    t.text('description').notNullable();
    t.integer('creator_id').references('id').inTable('users');
    t.string('public_id');
    t.string('resource_type');
    t.string('category').notNullable();
    t.integer('score').notNullable().defaultTo(0);
    t.timestamps(true, true);
    t.boolean('private').defaultTo(false);
    t.timestamp('expires_at').defaultTo(knex.fn.now());
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('challenges');
};
