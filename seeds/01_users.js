
exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'rynj',
          email: 'ryanj89@gmail.com'
        },
        {
          username: 'lbendell',
          email: 'lbendell3@gmail.com'
        },
      ]);
    });
};
