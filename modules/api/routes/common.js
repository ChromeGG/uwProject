module.exports = [
  {
    method: 'GET',
    path: '/health',
    config: {
      auth: false,
      description: 'The API health check',
      notes: 'Returns health check status',
      tags: ['api']
    },
    handler: async (request, h) => {
      const { db } = request
      await db.raw('SELECT 1')
      return { ok: true }
    }
  }
]
