const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', (req, res, next) => {
  knex('users').select()
    .then((result) => {
      res.send(result);
    });
});



module.exports = router;