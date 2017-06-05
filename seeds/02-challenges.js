exports.seed = knex => {
  return knex('challenges').del()
    .then(() => {
      return knex('challenges').insert([
        {
          name: 'Challenge #1',
          description: 'This is a description for a challenge. It should describe what the challenge is and any requirements to fulfill the challenge',
          creator_id: 1,
          video_url: 'https://www.youtube.com/watch?v=Ff9eDId1GtM&t=1502s',
          category: 'music',
          points: 100,
          private: true
        },
        {
          name: 'Challenge #2',
          description: 'This is a description for another challenge.',
          creator_id: 2,
          video_url: 'https://www.youtube.com/watch?v=Ff9eDId1GtM&t=1502s',
          category: 'outdoors',
          points: 200
        },
      ]);
    });
};
