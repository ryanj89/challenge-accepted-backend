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



module.exports = router;