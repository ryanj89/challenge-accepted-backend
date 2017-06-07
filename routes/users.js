// require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../db/api');
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

//  GET ALL USERS
router.get('/', (req, res) => {
  if (!req.query.email) {
    db.getAllUsers()
      .then((result) => {
        res.status(200).send(result);
      });
  } else {
    // console.log(req.query.email);
    db.getUserByEmail(req.query.email)
      .then((user) => {
        if (!user) {
          res.status(200).json(false);
        }
        res.status(200).json(user);
      })
  }
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
    email: req.body.email
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