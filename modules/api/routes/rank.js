const Joi = require('@hapi/joi')
const { getRank } = require('../src/readers/rankReader')

module.exports = [
  {
    method: 'GET',
    path: '/rank',
    config: {
      auth: false,
      description: 'Get rank',
      notes: 'Get rank',
      tags: ['api'],
      validate: {
        query: Joi.object({
          gameTypeId: Joi.string().optional()
        })
      }
    },
    handler: async ({ db, query }, h) => {
      return getRank(db, query)
    }
  }
]
