const commonRoutes = require('./common')
const importRoutes = require('./import')
const expenseRoutes = require('./expense')
const userRoutes = require('./user')
const reportRoutes = require('./report')

module.exports = [
  ...commonRoutes,
  ...importRoutes,
  ...expenseRoutes,
  ...userRoutes,
  ...reportRoutes
]
