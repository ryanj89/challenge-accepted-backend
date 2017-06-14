
exports.seed = knex => {
  return knex('submissions').del()
    .then(() => {
      return knex('submissions').insert([
        {
          u_id: 2,
          c_id: 2,
          submission: 'bassnectar_hninwx',
          resource_type: 'image',
          details: "Be jealous....",
          score: 3
        },
        {
          u_id: 1,
          c_id: 2,
          submission: 'jwjbo3gdsoayz5ixscpk',
          resource_type: 'image',
          details: "Here I am!",
          score: 4
        }
      ]);
    });
};
