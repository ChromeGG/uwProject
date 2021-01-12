require('dotenv').config()
const { mergeDeepRight } = require('ramda')

const commonConfig = {
  port: 3000,
  host: '0.0.0.0',
  corsOrigins: ['*'],
  db: {
    client: 'pg',
    debug: false,
    asyncStackTraces: false,
    connection: {
      user: 'karta_kredytowa',
      database: 'karta_kredytowa',
      password: 'test',
      port: 5432
    },
    pool: {
      min: 2,
      max: 5
    },
    acquireConnectionTimeout: 10000,
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/../database/migrations`
    },
    seeds: {
      directory: `${__dirname}/../database/seeders`
    }
  }
}

const configPerEnv = {
  development: {
    db: {
      asyncStackTraces: true,
      connection: { host: 'db' }
    }
  },
  test: {
    db: {
      asyncStackTraces: true,
      connection: { host: process.env.CI_DB_HOST || 'db-tests' },
      pool: { min: 1, max: 1 }
    }
  },
  production: {
    db: {
      connection: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
      }
    }
  }
}

module.exports = (env = process.env.NODE_ENV || 'development') =>
  mergeDeepRight(commonConfig, configPerEnv[env])
