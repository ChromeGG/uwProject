const Joi = require('@hapi/joi')
const { createGame } = require('../src/services/gameService')
const { getGames } = require('../src/readers/gameReader')

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
      return getGames(db, query)
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
          gameTypeId: Joi.string()
            .required(),
          moves: Joi.string()
            .required()
        })
      }
    },
    handler: async ({ db, payload }, h) => {
      const user = await createGame(db, payload)

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
