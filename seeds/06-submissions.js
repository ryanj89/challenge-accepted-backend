
exports.seed = knex => {
  return knex('submissions').del()
    .then(() => {
      return knex('submissions').insert([
        {
          u_id: 1,
          c_id: 3,
          submission: 'https://youtu.be/5c1cNMnvTsw',
          details: "This is a backflip",
        }
      ]);
    });
};
