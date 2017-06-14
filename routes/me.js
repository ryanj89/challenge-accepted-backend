const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const db = require('../db/api');

//  Get all current users info
router.get('/', (req, res) => {
  let response = {};
  knex('users')
    .where('email', req.user.email)
    .join('challenges', { 'challenges.creator_id': 'users.id' })
    .select(knex.raw('sum(challenges.score) as challenger_score, users.*'))
    .groupBy('users.id')
    .first()
    .then(results => {
      response = results;
      knex('submissions')
        .where('u_id', results.id)
        .sum('submissions.score as submission_score')
        .first()
        .then(data => {
          response.submission_score = data.submission_score;
          res.json(response);
        })
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
      console.log(results)
      res.json(results);
    });
});

module.exports = router;