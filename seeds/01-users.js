
exports.seed = knex => {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([
        {
          email: 'ryanj89@gmail.com',
          name: 'Ryan Johnson',
          picture: 'https://lh3.googleusercontent.com/-LQzInmBERZo/AAAAAAAAAAI/AAAAAAAAAFY/HdPr-vrjJB8/photo.jpg',
          role: 'admin'
        },
        {
          email: 'lbendell3@gmail.com',
          name: 'Lindsay Bendell',
          picture: 'https://s.gravatar.com/avatar/4075c740c0aed584ae88162f6c800c68?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Flb.png',
          role: 'user'
        },
      ]);
    });
};
