const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const validateToken = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://rynj.auth0.com/.well-known/jwks.json'
  }),
  audience: 'challenge-app-api',
  issuer: 'https://rynj.auth0.com/',
  algorithms: ['RS256']
});

//  GET ALL CHALLENGES
router.get('/', (req, res) => {
  knex('challenges')
    .join('users', { 'users.id' : 'challenges.creator_id'})
    .select('challenges.*', 'users.name as creator')
    .then(challenges => {
      res.status(200).json(challenges);
    });
});

//  GET CHALLENGE BY ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  knex('challenges')
    .where('id', id)
    .then(challenges => {
      res.status(200).json(challenges);
    });
})

// t.increments();
// t.integer('creator_id').references('id').inTable('users');
// t.string('video_url');
// t.string('category').notNullable();
// t.integer('points').notNullable();
// t.boolean('private').defaultTo(false);
// t.timestamp('expires_at');

//  CREATE CHALLENGE
router.post('/', (req, res) => {
  const challenge = {
    name: req.body.name,
    description: req.body.description,
    creator_id: req.body.creator_id,
    video_url: req.body.video_url,
    category: req.body.category,
    point: req.body.points,
    private: req.body.private,
    expires_at: req.body.expires_at
  }
  console.log(challenge);
});

// //  GET : Public challenges
// router.get('/public', (req, res) => {
//   knex('challenges')
//     .where('private', false)
//     .join('users', { 'users.id' : 'challenges.creator_id'})
//     .select('challenges.*', 'users.name as creator')
//     .then(challenges => res.status(200).json(challenges));
// });


// //  GET : Private Challenges
// router.get('/private', validateToken, (req, res) => {
//   console.log(req.user);
//   let challenges = [
//     {
//       id: 1,
//       name: 'Private Challenge #1',
//       description: 'This is my first private challenge',
//       created: new Date()
//     },
//     {
//       id: 2,
//       name: 'Private Challenge #2',
//       description: 'This is my second private challenge',
//       created: new Date()
//     },
//     {
//       id: 3,
//       name: 'Private Challenge #3',
//       description: 'This is my third private challenge',
//       created: new Date()
//     },
//   ];
//   res.json(challenges);
// });



module.exports = router;