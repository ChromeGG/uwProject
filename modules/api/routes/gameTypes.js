const Joi = require('@hapi/joi')
const { createGameType } = require('../src/services/gameTypeService')
const { getGameTypes } = require('../src/readers/gameTypeReader')

module.exports = [
  {
    method: 'GET',
    path: '/game-types',
    config: {
      auth: false,
      description: 'Get all game types',
      tags: ['api'],
      validate: {
        // query: Joi.object({
        //   page: Joi.number()
        //     .integer()
        //     .optional(),
        //   perPage: Joi.number()
        //     .integer()
        //     .optional(),
        //   query: Joi.string().optional()
        // })
      }
    },
    handler: async ({ db, query }, h) => {
      return getGameTypes(db, query)
    }
  },
  {
    method: 'POST',
    path: '/game-types',
    config: {
      auth: false,
      description: 'Creating an user',
      tags: ['api'],
      validate: {
        payload: Joi.object({
          name: Joi.string()
            .min(3)
            .max(30)
            .required(),
          weight: Joi.number()
            .integer()
            .min(1)
            .max(100)
            .required()
        })
      }
    },
    handler: async ({ db, payload }, h) => {
      const user = await createGameType(db, payload)

      return h.response(user).code(201)
    }
  }
  // {
  //   method: 'DELETE',
  //   path: '/tags/{tagId}',
  //   config: {
  //     auth: false,
  //     description: 'Delete tags',
  //     notes: 'Delete tags',
  //     tags: ['api'],
  //     validate: {
  //       params: Joi.object({
  //         tagId: Joi.number().integer()
  //       })
  //     }
  //   },
  //   handler: async ({ db, params: { tagId } }, h) => {
  //     await deleteTag(db, tagId)
  //     return h.response().code(204)
  //   }
  // },
  // {
  //   method: 'PATCH',
  //   path: '/tags/{tagId}',
  //   config: {
  //     auth: false,
  //     description: 'Change tag name by its id',
  //     notes: 'Change tag name',
  //     tags: ['api'],
  //     validate: {
  //       params: Joi.object({
  //         tagId: Joi.number().integer()
  //       }),
  //       payload: Joi.object({
  //         name: Joi.string().required()
  //       })
  //     }
  //   },
  //   handler: async ({ db, params: { tagId }, payload: { name } }, h) => {
  //     return updateTag(db, tagId, name)
  //   }
  // }
]
