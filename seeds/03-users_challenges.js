
exports.seed = knex => {
  return knex('users_challenges').del()
    .then(() => {
      return knex('users_challenges').insert([
        {
          u_id: 1,
          c_id: 1,
          voted: false,
          status: 'pending'
        },
        {
          u_id: 1,
          c_id: 2,
          voted: false,
          status: 'completed'
        },
        {
          u_id: 1,
          c_id: 3,
          voted: false,
          status: 'pending'
        },
        {
          u_id: 1,
          c_id: 4,
          voted: false,
          status: 'pending'
        },
        {
          u_id: 2,
          c_id: 3,
          voted: false,
          status: 'pending'
        },
        {
          u_id: 2,
          c_id: 2,
          voted: false,
          status: 'pending'
        },
      ]);
    });
};
