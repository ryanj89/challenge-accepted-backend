
exports.seed = knex => {
  return knex('submissions').del()
    .then(() => {
      return knex('submissions').insert([
        {
          u_id: 2,
          c_id: 2,
          submission: 'https://res.cloudinary.com/ryanj89/image/upload/v1497425944/bassnectar_hninwx.jpg',
          details: "Be jealous....",
          score: 3
        },
        {
          u_id: 1,
          c_id: 2,
          submission: 'https://res.cloudinary.com/ryanj89/image/upload/v1497403218/jwjbo3gdsoayz5ixscpk.jpg',
          details: "Here I am!",
          score: 4
        }
      ]);
    });
};
