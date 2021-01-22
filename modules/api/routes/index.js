const commonRoutes = require('./common')
const userRoutes = require('./user')
const gameTypes = require('./gameTypes')
const gameRoutes = require('./game')
const rankRoutes = require('./rank')

module.exports = [
  ...commonRoutes,
  ...userRoutes,
  ...gameTypes,
  ...gameRoutes,
  ...rankRoutes
]
