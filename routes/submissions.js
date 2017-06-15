const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', (req, res) => {
  let query = knex('submissions')
  if(req.query.challenge) {
    query = query.where('c_id', req.query.challenge);
  }
  query
    .join('users', {'users.id':'submissions.u_id'})
    .select('submissions.*', 'users.name', 'users.picture')
    .then(results => {
      res.status(200).json(results);
    })
});

// router.get('/test', (req, res) => {
//   knex('users_challenges')
//     .where({ 'u_id': 1, 'c_id': 2})
//     .select('*')
//     .then(results => res.json(results));
// })

router.post('/', (req, res) => {
  const submission = {
    u_id: req.body.u_id,
    c_id: req.body.c_id,
    submission: req.body.submission,
    details: req.body.details
  }
  knex('submissions')
    .insert(submission)
    .returning('*')
    .then(results => {
      const newSubmission = results[0];
      //  Update users_challenges status
      knex('users_challenges')
        .where({ 'u_id': newSubmission.u_id, 'c_id': newSubmission.c_id})
        .update({ status: 'completed' })
        .then(result => {
          res.status(201).json(result);
        })
    })
})

router.patch('/:id', (req, res) => {
  let updatedScore = 0;
  if (req.body.prevVoteId) {
    knex('submissions')
      .where('id', req.params.id)
      .decrement('score', 1)
      .returning('score')
      .then(score => {
        updatedScore = score[0];
        // console.log(updatedScore);
        knex('challenges')
          .where('id', req.body.challenge)
          .decrement('score', 1)
          .then(results => {
            // res.status(200).json(updatedScore);
            //  Update users_challenges voted
            knex('users_challenges')
              .where({
                c_id: req.body.challenge,
                u_id: req.body.user_id })
              .update({ voted: null })
              .then(result => {
                console.log(updatedScore);
                res.status(200).json(updatedScore);
              })
          })
      })
  } else {
    //  Update Submission score
    knex('submissions')
      .where('id', req.params.id)
      .increment('score', 1)
      .returning('score')
      .then(score => {
        updatedScore = score[0];
        //  Update challenge score
        knex('challenges')
          .where('id', req.body.challenge)
          .increment('score', 1)
          .then(results => {
            //  Update users_challenges voted
            knex('users_challenges')
              .where({
                c_id: req.body.challenge,
                u_id: req.body.user_id })
              .update({ voted: req.params.id })
              .then(result => {
                res.status(200).json(updatedScore);
              })
          })
      })
  }
})

module.exports = router;