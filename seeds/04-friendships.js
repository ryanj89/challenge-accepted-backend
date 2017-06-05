
exports.seed = knex => {
  return knex('friendships').del()
    .then(() => {
      return knex('friendships').insert([
        {
          u_id: 1,
          f_id: 2
        },
        {
          u_id: 2,
          f_id: 1
        },
      ]);
    });
};
