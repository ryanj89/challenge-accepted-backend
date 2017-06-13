exports.seed = knex => {
  return knex('messages').del()
    .then(() => {
      return knex('messages').insert([
        {
          u_id: 1,
          c_id: 2,
          message: 'Hey there!'
        },
        {
          u_id: 2,
          c_id: 2,
          message: "What's up?"
        },
        {
          u_id: 1,
          c_id: 2,
          message: 'Awesome challenge!'
        },
      ]);
    });
};
