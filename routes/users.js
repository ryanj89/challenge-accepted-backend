const express = require('express');
const router = express.Router();
const db = require('../db/api');
const knex = require('../db/knex');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

//  GET ALL USERS
router.get('/', (req, res) => {
  if (!req.query.email) {
    db.getAllUsers()
      .then((result) => {
        res.status(200).send(result);
      });
  } else {
  let response = {};
  knex('users')
    .where('email', req.query.email)
    .then(results => {
      res.json(results);
    });
  }
  // if (!req.query.email) {
  //   db.getAllUsers()
  //     .then((result) => {
  //       res.status(200).send(result);
  //     });
  // } else {
  // let response = {};
  // knex('users')
  //   // .where('email', req.user.email)
  //   .where('email', req.query.email)
  //   .join('users_challenges', { 'users_challenges.u_id': 'users.id' })
  //   .join('challenges', { 'challenges.id': 'users_challenges.c_id' })
  //   .select(knex.raw('sum(challenges.score) as challenger_score, users.*'))
  //   .groupBy('users.id')
  //   .first()
  //   .then(results => {
  //     response = results;
  //     knex('submissions')
  //       .where('u_id', results.id)
  //       .sum('submissions.score as submission_score')
  //       .first()
  //       .then(data => {
  //         response.submission_score = data.submission_score;
  //         res.json(response);
  //       })
  //   });
  // }
});

//  GET USER BY ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.getUserById(id)
    .then((results) => {
      res.status(200).json(results);
    });
});

//  CREATE USER
router.post('/', (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    picture: req.body.picture,
    role: req.body.role
  };
  db.createUser(user)
    .then(userId => {
      res.status(201).json(userId);
    });
});

//  UPDATE USER
router.patch('/:id', (req, res) => {
  const id = req.params.id;
  const user = { 
    name: req.body.name,
    email: req.body.email
  };
  if (typeof user.name === 'string' && typeof user.email === 'string'
  && user.name.trim() !== '' && user.email.trim() !== '') {
    db.updateUser(id, user)
      .then(updatedUser => {
        res.status(200).json(updatedUser);
      });
  } else {
    res.status(500).send('Invalid Request');
  }
});

//  DELETE USER
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.deleteUser(id)
    .then(() => {
      res.status(200).send();
    });
});

module.exports = router;