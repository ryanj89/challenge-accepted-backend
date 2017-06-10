const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const db = require('../db/api');

//  Get all current users info
router.get('/', (req, res) => {
  let response = {};
  knex('users')
    .where('email', req.user.email)
    .join('users_challenges', { 'users_challenges.u_id': 'users.id' })
    .join('challenges', { 'challenges.id': 'users_challenges.c_id' })
    .select('users_challenges.status', 'challenges.*')
    .then(results => {
      console.log(results);
      res.json(results);
    });
});

router.get('/challenges', (req, res) => {
  let response = {};
  knex('users')
    .where('users.email', req.user.email)
    .join('users_challenges', { 'users_challenges.u_id': 'users.id' })
    .join('challenges', { 'challenges.id': 'users_challenges.c_id' })
    .join('users as creator', { 'creator.id': 'challenges.creator_id' })
    .select('creator.*', 'challenges.*', 'users_challenges.status')
    .then(results => {
      console.log(results);
      res.json(results);
    });
});

module.exports = router;