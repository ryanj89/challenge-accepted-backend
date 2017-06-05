// CHALLENGE
// (PK) id: number
// name: string
// Description: string
// Created at: date
// Updated at: date
// (FK) Creator id: number
// Video URL: string
// Category: string
// Points: number
// Private: bool 
// Expires at: date
exports.up = knex => {
  return knex.schema.createTable('challenges', t => {
    t.increments();
    t.string('name').notNullable();
    t.text('description');
    t.timestamps(true, true);
    t.integer('creator_id').references('id').inTable('users');
    t.string('video_url');
    t.string('category').notNullable();
    t.integer('points').notNullable();
    t.boolean('private').defaultTo(false);
    t.timestamp('expires_at');
  });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('challenges');
};
