exports.seed = knex => {
  return knex('challenges').del()
    .then(() => {
      return knex('challenges').insert([
        {
          name: 'Go on a hike in the Rocky Mountains',
          description: 'Go on a hike in the Rocky Mountains. Try to get a better view than this!',
          creator_id: 2,
          challenge_img: 'https://res.cloudinary.com/ryanj89/image/upload/v1497425990/french-italian-alps-walking-hiking-tour_vxrrwv.jpg',
          category: 'outdoors',
          private: false,
          expires_at: new Date(2017, 6, 15)
        },
        {
          name: 'Go on a bike ride through downtown',
          description: 'Ride through downtown on a bike, how fast can you go?',
          creator_id: 2,
          challenge_img: 'https://http://res.cloudinary.com/ryanj89/image/upload/v1497567236/Bike-Lake_z1yf5e.jpg',
          category: 'outdoors',
          private: false,
          expires_at: new Date(2017, 6, 15)
        },
        {
          name: 'Ryan\'s Private Challenge',
          description: 'This is a description for a challenge. It should describe what the challenge is and any requirements to fulfill the challenge',
          creator_id: 1,
          challenge_img: 'https://res.cloudinary.com/ryanj89/image/upload/v1497392605/m8lmeyspy9o7nb5rg7ak.jpg',
          category: 'outdoors',
          private: true,
          expires_at: new Date(2017, 6, 9)
        },
        {
          name: 'Perform at a music festival',
          description: 'Play a performance on the main stage at a major music festival',
          creator_id: 1,
          challenge_img: 'https://res.cloudinary.com/ryanj89/image/upload/v1497425944/bassnectar_hninwx.jpg',
          category: 'music',
          private: false,
          expires_at: new Date(2017, 6, 10)
        },
        {
          name: 'Lindsay\'s Private Challenge',
          description: 'This is a description for another challenge.',
          creator_id: 2,
          challenge_img: 'https://res.cloudinary.com/ryanj89/image/upload/v1497425990/french-italian-alps-walking-hiking-tour_vxrrwv.jpg',
          category: 'outdoors',
          private: true,
          expires_at: new Date(2017, 6, 9)
        },
      ]);
    });
};
