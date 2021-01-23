const Joi = require('@hapi/joi')
const { createUser } = require('../src/services/userService')
const { getUsers } = require('../src/readers/userReader')

module.exports = [
  {
    method: 'GET',
    path: '/users',
    config: {
      auth: false,
      description: 'Get all users',
      notes: 'Get users',
      tags: ['api'],
      validate: {
        query: Joi.object({
          page: Joi.number()
            .integer()
            .optional(),
          perPage: Joi.number()
            .integer()
            .optional(),
          query: Joi.string().optional()
        })
      }
    },
    handler: async ({ db, query }, h) => {
      return getUsers(db, query)
    }
  },
  {
    method: 'POST',
    path: '/users',
    config: {
      auth: false,
      description: 'Creating an user',
      tags: ['api'],
      validate: {
        payload: Joi.object({
          nickname: Joi.string()
            .required()
            .min(3)
            .max(30)
        })
      }
    },
    handler: async ({ db, payload }, h) => {
      const user = await createUser(db, payload)

      return h.response(user).code(201)
    }
  }
]
