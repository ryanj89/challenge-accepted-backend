require('dotenv').config();
const express = require('express');
const jwt = require('express-jwt');
// const jwks = require('jwks-rsa');   //  Lib to retrieve RSA signing keys from a JWKS (JSON Web Key Set) endpoint.
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');

const PORT = process.env.PORT || 3000;
const app = express();

//  Middleware
app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//  JWT validation
//  Require protected routes to have valid access_token sent in Authorization header
// const authenticated = jwt({
//   secret: jwks.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: 'https://rynj.auth0.com/.well-known/jwks.json'
//   }),
//   audience: 'challenge-app-api',
//   issuer: 'https://rynj.auth0.com/',
//   algorithms: ['RS256']
// });

const authenticated = jwt({
  secret: process.env.SECRET, 
  credentialsRequired: true, 
  getToken: fromHeaderOrQuerystring
});

//  Routing
app.use('/api/users', require('./routes/users'));
app.use('/api/challenges', require('./routes/challenges'));
app.use('/api/me', authenticated, require('./routes/me'));

//  Listening Port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

function fromHeaderOrQuerystring (req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}