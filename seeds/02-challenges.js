exports.seed = knex => {
  return knex('challenges').del()
    .then(() => {
      return knex('challenges').insert([
        {
          name: 'Ryan\'s Private Challenge',
          description: 'This is a description for a challenge. It should describe what the challenge is and any requirements to fulfill the challenge',
          creator_id: 1,
          public_id: 'opbwqxegu5wfu8pqevio',
          resource_type: 'image',
          category: 'outdoors',
          private: true,
          expires_at: new Date(2017, 6, 9)
        },
        {
          name: 'Perform at a music festival',
          description: 'Play a performance on the main stage at a major music festival',
          creator_id: 1,
          public_id: 'bassnectar_hninwx',
          resource_type: 'image',
          category: 'music',
          private: false,
          expires_at: new Date(2017, 6, 10)
        },
        {
          name: 'Go on a hike in the Rocky Mountains',
          description: 'Go on a hike in the Rocky Mountains. Try to get a better view than this!',
          creator_id: 2,
          public_id: 'french-italian-alps-walking-hiking-tour_vxrrwv',
          resource_type: 'image',
          category: 'outdoors',
          private: false,
          expires_at: new Date(2017, 6, 15)
        },
        {
          name: 'Lindsay\'s Private Challenge',
          description: 'This is a description for another challenge.',
          creator_id: 2,
          public_id: 'french-italian-alps-walking-hiking-tour_vxrrwv',
          resource_type: 'image',
          category: 'outdoors',
          private: true,
          expires_at: new Date(2017, 6, 9)
        },
      ]);
    });
};
