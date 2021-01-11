const commonRoutes = require('./common')
const importRoutes = require('./import')
const expenseRoutes = require('./expense')
const tagRoutes = require('./tag')
const reportRoutes = require('./report')

module.exports = [
  ...commonRoutes,
  ...importRoutes,
  ...expenseRoutes,
  ...tagRoutes,
  ...reportRoutes
]
