exports.up = knex => {
  return knex.schema.createTable('challenges', t => {
    t.increments();
    t.string('name').notNullable();
    t.text('description').notNullable();
    t.integer('creator_id').references('id').inTable('users');
    t.string('video_url');
    t.string('category').notNullable();
    t.integer('score').notNullable().defaultTo(0);
    t.timestamps(true, true);
    t.boolean('private').defaultTo(false);
    t.timestamp('expires_at');
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('challenges');
};
