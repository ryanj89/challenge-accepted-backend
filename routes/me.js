const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const db = require('../db/api');

//  Get all current users info
router.get('/', (req, res) => {
  let response = {};
  knex('users')
    .where('email', req.user.email)
    .first()
    .then(results => {
      response = results;
      knex('submissions')
        .where('u_id', results.id)
        .join('challenges', { 'challenges.creator_id': results.id })
        .select(knex.raw('sum(challenges.score) as challenger_score, sum(submissions.score) as submission_score'))
        .first()
        .then(data => {
          response.challenger_score = data.challenger_score;
          response.submission_score = data.submission_score;

          if (response.challenger_score === null) {
            response.challenger_score = 0;
          } 
          if (response.submission_score === null) {
            response.submission_score = 0;
          }
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
      res.json(results);
    });
});

module.exports = router;