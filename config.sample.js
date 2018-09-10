module.exports = {
  mongodb: {
    connString: 'mongodb://user:pass@your-url.example.com:1234/db-name',
    collections: ['users', 'disposableWallets']
  },
  express: {
    sessionSecret: 'this should be a random-generated string'
  }
}