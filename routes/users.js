// require('dotenv').config();
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
  audience: 'https://rynj.auth0.com/userinfo',
  issuer: 'https://rynj.auth0.com/',
  algorithms: ['RS256']
});

router.get('/', (req, res, next) => {
  knex('users').select()
    .then((result) => {
      res.send(result);
    });
});

router.get('/:email', validateToken, (req, res, next) => {
  console.log(req.body);
  // knex('users')
  //   .where('email', req.params.email)
  //   .then(result => console.log(result));
});


module.exports = router;