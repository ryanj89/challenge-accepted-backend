exports.seed = knex => {
  return knex('messages').del()
    .then(() => {
      return knex('messages').insert([
        {
          user: 1,
          name: 'Ryan Johnson',
          room: 2,
          message: 'Hey there!'
        },
        {
          user: 2,
          name: 'Lindsay Bendell',
          room: 2,
          message: "What's up?"
        },
        {
          user: 1,
          name: 'Ryan Johnson',
          room: 2,
          message: 'Awesome challenge!'
        },
      ]);
    });
};