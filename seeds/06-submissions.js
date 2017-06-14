
exports.seed = knex => {
  return knex('submissions').del()
    .then(() => {
      return knex('submissions').insert([
        {
          u_id: 2,
          c_id: 2,
          submission: 'bassnectar_hninwx',
          resource_type: 'image',
          details: "This is a backflip",
        },
        {
          u_id: 1,
          c_id: 2,
          submission: 'bassnectar_hninwx',
          resource_type: 'image',
          details: "Another One",
        }
      ]);
    });
};
