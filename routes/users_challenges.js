const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

//  GET users_challenges
router.get('/', (req, res) => {
  let query = knex('users_challenges')
  if (req.query.challenge) {
    query = query.where('c_id', req.query.challenge)
  }
  query
    .join('users', { 'users.id':'users_challenges.u_id'})
    .select('users_challenges.*', 'users.name', 'users.picture')
    .then(results => {
      res.status(200).json(results);
    })
});

//  POST to users_challenges
router.post('/', (req, res) => {
  knex('users_challenges')
    .insert(req.body)
    .returning('*')
    .then(result => res.status(201).json(result));
})

module.exports = router;