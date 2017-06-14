require('dotenv').config();
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const authenticated = jwt({
  secret: process.env.SECRET, 
  credentialsRequired: true, 
  getToken: fromHeaderOrQuerystring
});

//  GET ALL CHALLENGES
router.get('/', (req, res) => {
  knex('challenges')
    .where('challenges.private', false)
    .join('users', { 'users.id' : 'challenges.creator_id'})
    .join('users_challenges', {'challenges.id': 'users_challenges.c_id'})
    .select(knex.raw('count(users_challenges.u_id) as competitor_count, challenges.*, users.name as creator, users.picture as user_picture'))
    .groupBy('challenges.id', 'users.name', 'users.picture')
    .then(results => {
      res.status(200).json(results);
    })
  // let query = knex('challenges');
  // if (req.query.name) {
  //   query = query.where('challenges.name', req.query.name)
  // }
  // // knex('challenges')
  // query.where('challenges.private', false)
  //   .join('users', { 'users.id' : 'challenges.creator_id'})
  //   .select('challenges.*', 'users.name as creator', 'users.picture as user_picture')
  //   .then(challenges => {
  //     res.status(200).json(challenges);
  //   });
});

//  GET CHALLENGE BY ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  knex('challenges')
    .where('challenges.id', id)
    .first()
    .join('users', { 'users.id' : 'challenges.creator_id'})
    .select('challenges.*', 'users.name as creator', 'users.picture as user_picture')
    .then(challenges => {
      res.status(200).json(challenges);
    });
})

router.get('/:id/users', (req, res) => {
  const id = req.params.id;
  knex('users_challenges')
    .where('c_id', id)
    .join('users', { 'users.id' : 'users_challenges.u_id' })
    .then(results => {
      res.status(200).json(results);
    })
});

router.get('/:id/submissions', (req, res) => {
  const id = req.params.id;
  knex('submissions')
    .where('c_id', id)
    .join('users', { 'users.id' : 'submissions.u_id' })
    .select('submissions.*', 'users.name', 'users.picture')
    .then(results => {
      res.status(200).json(results);
    })
});

router.get('/:id/messages', (req, res) => {
  knex('messages')
    .where('room', req.params.id)
    .join('users', { 'users.id' : 'messages.user' })
    .select('messages.*', 'users.name')
    .then(results => {
      res.status(200).json(results);
    });
});

//  CREATE CHALLENGE
router.post('/', authenticated, (req, res) => {
  const challenge = {
    name: req.body.name,
    description: req.body.description,
    creator_id: req.body.creator_id,
    public_id: req.body.public_id,
    resource_type: req.body.resource_type,
    category: req.body.category,
    private: req.body.is_private,
    expires_at: req.body.expires_at
  }
  //  Validate request body
  if (validChallenge(challenge)) {
    knex('challenges').insert(challenge).returning('*')
      .then((results) => {
        const newChallenge = results[0];
        console.log('CHALLENGE CREATED!');
        const userChallenge = { u_id: newChallenge.creator_id, c_id: newChallenge.id };
        knex('users_challenges').insert(userChallenge).returning('status')
          .then(result => {
            console.log('USER_CHALLENGE CREATED!');
            newChallenge.status = result[0];
            res.status(201).json(newChallenge);
          });
      })
  } else {
    res.status(400).send('Invalid Request Body');
  }
});

function validChallenge(challenge) {
  return (typeof challenge.name === 'string' && typeof challenge.description === 'string'
          && typeof challenge.creator_id === 'number' && typeof challenge.category === 'string' 
          && typeof challenge.private === 'boolean' && challenge.name.trim() !== '' 
          && challenge.description.trim() !== '' && challenge.category.trim() !== '');
}


function fromHeaderOrQuerystring (req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

module.exports = router;