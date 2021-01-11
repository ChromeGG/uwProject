const { getReports } = require('../src/readers/reportsReader')
module.exports = [
  {
    method: 'GET',
    path: '/reports',
    config: {
      auth: false,
      description: 'Get all reports',
      notes: 'Get reports',
      tags: ['api']
    },
    handler: async ({ db, query }, h) => {
      return getReports(db)
    }
  }
]
