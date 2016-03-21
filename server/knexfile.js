module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'corruptiontracker'
    }
  },
  production: {
    client: 'postgres',
    connection: {
      database: 'corruptiontracker'
    }
  }
}