require('dotenv').config();
const knex = require('./db/knex');
const express = require('express');
const socketio = require('socket.io');
const jwt = require('express-jwt');
// const jwks = require('jwks-rsa');   //  Lib to retrieve RSA signing keys from a JWKS (JSON Web Key Set) endpoint.
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');

const PORT = process.env.PORT || 3000;
const ENV = process.env.ENV || "development";
const app = express();
//  Express Config
app.set('port', PORT);
app.set('env', ENV);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//  Middleware
app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


const connectedUsers = {};

//  Websockets
const server = app.listen(app.get('port'), () => {
  console.log('Listening on port ' + app.get('port'));
});
const io = socketio(server, {'origins': '*:*'});

io.on('connection', (client) => {
  console.log('Client connected');

  client.on('join', (data) => {

    client.join(data.room);
    //  Add users to connected users list
    if (connectedUsers[data.room]) {
      if (connectedUsers[data.room].indexOf(data.userId) === -1) {
        connectedUsers[data.room].push(data.userId);
      }
    } else {
      connectedUsers[data.room] = [data.userId];
    }
    console.log(connectedUsers[data.room]);

    client.to(data.room).emit('roomUpdate', connectedUsers[data.room]);
  })

  client.on('send', data => {
    knex('messages').insert(data).then(results => {
      client.to(data.room).emit('chat', data);
    })
  });

  client.on('leave', (data) => {
    console.log('LEAVE');
    if (connectedUsers[data.room]) {
      connectedUsers[data.room] = connectedUsers[data.room].filter(u => u !== data.userId);
    }
    client.to(data.room).emit('roomUpdate', connectedUsers[data.room]);
  })

  client.on('disconnect', (data) => {
    console.log('Client disconnected');
  });
});

//  JWT validation
const authenticated = jwt({
  secret: process.env.SECRET, 
  credentialsRequired: true, 
  getToken: fromHeaderOrQuerystring
});

//  API Routing
const router = express.Router();
router.get('/rooms/:id', (req, res) => {
  if (connectedUsers[req.params.id]) {
    res.json(connectedUsers[req.params.id]);
  } else {
    res.status(404);
  }
});

router.get('/test', (req, res) => {
  // knex('challenges')
  //   .where('challenges.private', false)
  //   .join('users', { 'users.id' : 'challenges.creator_id'})
  //   .join('users_challenges', {'challenges.id': 'users_challenges.c_id'})
  //   .select(knex.raw('count(users_challenges.u_id) as competitor_count, challenges.*, users.name as creator, users.picture as user_picture'))
  //   .groupBy('challenges.id', 'users.name', 'users.picture')
  //   .then(results => {
  //     res.status(200).json(results);
  //   })



  // let query = knex('challenges');
  // // if (req.query.name) {
  // //   query = query.where('challenges.name', req.query.name)
  // // }
  // // knex('challenges')
  // query.where('challenges.private', false)
  //   .join('users', { 'users.id' : 'challenges.creator_id'})
  //   .join('users_challenges', { 'challenges.id' : 'users_challenges.c_id'})
  //   .select('users_challenges.*', 'challenges.*', 'users.name as creator', 'users.picture as user_picture')
  //   .then(challenges => {
  //     res.status(200).json(challenges);
  //   });
});


router.use('/api/users', require('./routes/users'));
router.use('/api/challenges', require('./routes/challenges'));
router.use('/api/users_challenges', require('./routes/users_challenges'));
router.use('/api/submissions', authenticated, require('./routes/submissions'));
router.use('/api/me', authenticated, require('./routes/me'));

app.use('/', router);

function fromHeaderOrQuerystring (req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}