require('dotenv').config();
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const cloudinary = require('cloudinary');

const authenticated = jwt({
  secret: process.env.SECRET, 
  credentialsRequired: true, 
  getToken: fromHeaderOrQuerystring
});

//  GET ALL CHALLENGES
router.get('/', (req, res) => {
  knex('challenges')
    .where('private', false)
    .join('users', { 'users.id' : 'challenges.creator_id'})
    .select('challenges.*', 'users.name as creator', 'users.picture as user_picture', 'users.score as creator_score')
    .then(challenges => {
      res.status(200).json(challenges);
    });
});



//  GET CHALLENGE BY ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  knex('challenges')
    .where('id', id)
    .then(challenges => {
      res.status(200).json(challenges);
    });
})

//  CREATE CHALLENGE
router.post('/', authenticated, (req, res) => {
  const challenge = {
    name: req.body.name,
    description: req.body.description,
    creator_id: req.body.creator_id,
    video_url: req.body.video_url,
    category: req.body.category,
    points: req.body.points,
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
          && typeof challenge.points === 'number' && typeof challenge.private === 'boolean'
          && challenge.name.trim() !== '' && challenge.description.trim() !== ''
          && challenge.category.trim() !== '');
}

// function uploadFile(req) {
//   var datauri = new Datauri();
//   datauri.format('.jpg', req.file.buffer);
//   cloudinary.uploader.upload(datauri.content, function (result) {
//     const imgUrl = result.secure_url;
//     console.log('secure_url: ', imgUrl);
//   });
// }

// //  GET : Public challenges
// router.get('/public', (req, res) => {
//   knex('challenges')
//     .where('private', false)
//     .join('users', { 'users.id' : 'challenges.creator_id'})
//     .select('challenges.*', 'users.name as creator')
//     .then(challenges => res.status(200).json(challenges));
// });


// //  GET : Private Challenges
// router.get('/private', authenticated, (req, res) => {
//   console.log(req.user);
//   let challenges = [
//     {
//       id: 1,
//       name: 'Private Challenge #1',
//       description: 'This is my first private challenge',
//       created: new Date()
//     },
//     {
//       id: 2,
//       name: 'Private Challenge #2',
//       description: 'This is my second private challenge',
//       created: new Date()
//     },
//     {
//       id: 3,
//       name: 'Private Challenge #3',
//       description: 'This is my third private challenge',
//       created: new Date()
//     },
//   ];
//   res.json(challenges);
// });

function fromHeaderOrQuerystring (req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

module.exports = router;