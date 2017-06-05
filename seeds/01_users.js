
exports.seed = knex => {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([
        {
          email: 'ryanj89@gmail.com',
          name: 'Ryan Johnson',
        },
        {
          email: 'lbendell3@gmail.com',
          name: 'Lindsay Bendell',
        },
      ]);
    });
};
