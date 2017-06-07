const db = require('./knex');

//  Create
function createUser(user) {
  return db('users').insert(user).returning('*');
}

//  List
function getAllUsers() {
  return db('users');
}

//  Read
function getUserById(id) {
  return db('users').where('id', id);
}
function getUserByEmail(email) {
  return db('users').where('email', email).first();
}

//  Update
function updateUser(id, user) {
  return db('users').where('id', id).update(user, '*');
}

//  Delete
function deleteUser(id) {
  return db('users').where('id', id).del();
}

module.exports = {
  // Users
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser
}