const express = require('express');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');   //  Lib to retrieve RSA signing keys from a JWKS (JSON Web Key Set) endpoint.
const cors = require('cors');
const bodyParser = require('body-parser');
// const path = require('path');
const logger = require('morgan');
const helmet = require('helmet');

const PORT = process.env.PORT || 3000;
const app = express();

//  Middleware
app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//  JWT validation
//  Require protected routes to have valid access_token sent in Authorization header
const validateToken = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://rynj.auth0.com/.well-known/jwks.json'
  }),
  audience: 'challenge-app-api',
  issuer: 'https://rynj.auth0.com/',
  algorithms: ['RS256']
});

//  Routing
// app.use('/users', require('./routes/users'));

//  Public Challenges
app.get('/api/challenges/public', (req, res) => {
  let challenges = [
    {
      id: 1,
      name: 'Challenge #1',
      description: 'This is my first challenge',
      created: new Date()
    },
    {
      id: 2,
      name: 'Challenge #2',
      description: 'This is my second challenge',
      created: new Date()
    },
    {
      id: 3,
      name: 'Challenge #3',
      description: 'This is my third challenge',
      created: new Date()
    },
  ];
  res.json(challenges);
});

//  Private Challenges
app.get('/api/challenges/private', validateToken, (req, res) => {
  let challenges = [
    {
      id: 1,
      name: 'Private Challenge #1',
      description: 'This is my first private challenge',
      created: new Date()
    },
    {
      id: 2,
      name: 'Private Challenge #2',
      description: 'This is my second private challenge',
      created: new Date()
    },
    {
      id: 3,
      name: 'Private Challenge #3',
      description: 'This is my third private challenge',
      created: new Date()
    },
  ];
  res.json(challenges);
});



//  Listening Port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

