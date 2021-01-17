const commonRoutes = require('./common')
const userRoutes = require('./user')
const gameTypes = require('./gameTypes')

module.exports = [
  ...commonRoutes,
  ...userRoutes,
  ...gameTypes
]
