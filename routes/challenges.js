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

//  GET : Public challenges
router.get('/public', (req, res) => {
  knex('challenges')
    .where('private', false)
    .select()
    .then(challenges => res.json(challenges));
  // let challenges = [
  //   {
  //     id: 1,
  //     name: 'Challenge #1',
  //     description: 'This is my first challenge',
  //     created: new Date()
  //   },
  //   {
  //     id: 2,
  //     name: 'Challenge #2',
  //     description: 'This is my second challenge',
  //     created: new Date()
  //   },
  //   {
  //     id: 3,
  //     name: 'Challenge #3',
  //     description: 'This is my third challenge',
  //     created: new Date()
  //   },
  //   {
  //     id: 3,
  //     name: 'Challenge #4',
  //     description: 'This is my fourth challenge',
  //     created: new Date()
  //   },
  // ];
  // res.json(challenges);
});


//  GET : Private Challenges
router.get('/private', validateToken, (req, res) => {
  console.log(req.user);
  let challenges = [
    {
      id: 1,
      name: 'Private Challenge #1',
      description: 'This is my first private challenge',
      created: new Date()
    },
    {
      id: 2,
      name: 'Private Challenge #2',
      description: 'This is my second private challenge',
      created: new Date()
    },
    {
      id: 3,
      name: 'Private Challenge #3',
      description: 'This is my third private challenge',
      created: new Date()
    },
  ];
  res.json(challenges);
});



module.exports = router;