
exports.seed = knex => {
  return knex('users_challenges').del()
    .then(() => {
      return knex('users_challenges').insert([
        {
          u_id: 1,
          c_id: 1,
          status: 'completed'
        },
        {
          u_id: 1,
          c_id: 2,
          status: 'pending'
        },
        {
          u_id: 1,
          c_id: 4,
          status: 'failed'
        },
        {
          u_id: 2,
          c_id: 3,
          status: 'completed'
        },
        {
          u_id: 2,
          c_id: 2,
          status: 'failed'
        },
      ]);
    });
};
