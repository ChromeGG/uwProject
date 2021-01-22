const Joi = require('@hapi/joi')
const { createGame } = require('../src/services/gameService')
const { getGames } = require('../src/readers/gameReader')

module.exports = [
  {
    method: 'GET',
    path: '/games',
    config: {
      auth: false,
      description: 'Get all game types',
      tags: ['api'],
      validate: {
      }
    },
    handler: async ({ db, query }, h) => {
      return getGames(db, query)
    }
  },
  {
    method: 'POST',
    path: '/games',
    config: {
      auth: false,
      description: 'Creating an game with game type, users, moves and date',
      tags: ['api'],
      validate: {
        payload: Joi.object({
          gameTypeId: Joi.string()
            .required(),
          moves: Joi.string()
            .required(),
          date: Joi.date()
            .required(),
          users: Joi.array()
            .items(
              Joi.object({
                id: Joi.string().required(),
                place: Joi.number()
                  .min(1)
                  .required()
              })
            )
            .min(2)
            .required()
        })
      }
    },
    handler: async ({ db, payload }, h) => {
      const game = await createGame(db, payload)
      console.log(game)

      return h.response(game).code(201)
    }
  }
]
