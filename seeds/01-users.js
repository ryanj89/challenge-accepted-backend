
exports.seed = knex => {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([
        {
          name: 'Ryan Johnson',
          email: 'ryanj89@gmail.com',
          picture: 'https://lh3.googleusercontent.com/-LQzInmBERZo/AAAAAAAAAAI/AAAAAAAAAFY/HdPr-vrjJB8/photo.jpg',
          score: 1250,
          role: 'admin'
        },
        {
          name: 'Lindsay Bendell',
          email: 'lbendell3@gmail.com',
          picture: 'https://s.gravatar.com/avatar/4075c740c0aed584ae88162f6c800c68?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Flb.png',
          score: 500,
          role: 'user'
        },
      ]);
    });
};
