exports.seed = knex => {
  return knex('challenges').del()
    .then(() => {
      return knex('challenges').insert([
        {
          name: 'Ryan\'s Private Challenge',
          description: 'This is a description for a challenge. It should describe what the challenge is and any requirements to fulfill the challenge',
          creator_id: 1,
          video_url: 'https://res.cloudinary.com/ryanj89/image/upload/v1496983819/opbwqxegu5wfu8pqevio.jpg',
          category: 'outdoors',
          points: 100,
          private: true,
          expires_at: new Date(2017, 6, 9)
        },
        {
          name: 'Ryan\'s Public Challenge',
          description: 'This is a description for a challenge. It should describe what the challenge is and any requirements to fulfill the challenge',
          creator_id: 1,
          video_url: 'http://blog.iheartraves.com/wp-content/uploads/2015/06/bassnectar.jpg',
          category: 'music',
          points: 100,
          private: false,
          expires_at: new Date(2017, 6, 10)
        },
        {
          name: 'Lindsay\'s Public Challenge',
          description: 'This is a description for another challenge.',
          creator_id: 2,
          video_url: 'https://backroads-web.s3.amazonaws.com/images/search/thumbnail/french-italian-alps-walking-hiking-tour.jpg',
          category: 'outdoors',
          points: 200,
          private: false,
          expires_at: new Date(2017, 6, 15)
        },
        {
          name: 'Lindsay\'s Private Challenge',
          description: 'This is a description for another challenge.',
          creator_id: 2,
          video_url: 'https://backroads-web.s3.amazonaws.com/images/search/thumbnail/french-italian-alps-walking-hiking-tour.jpg',
          category: 'outdoors',
          points: 400,
          private: true,
          expires_at: new Date(2017, 6, 9)
        },
      ]);
    });
};
