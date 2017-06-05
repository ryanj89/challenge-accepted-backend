module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/challenge'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
