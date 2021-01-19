const Base = require('./Base')
const { Model } = require('objection')

class Game extends Base {
  static get tableName() {
    return 'ranks'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],

      properties: {
        gameTypeId: { type: 'string' },
        userId: { type: 'string' },
        rank: { type: 'integer' },
        createdAt: { type: 'timestamp' },
        updatedAt: { type: 'timestamp' }
      }
    }
  }

  // static get relationMappings() {
  //   const GameType = require('./GameType')

  //   return {
  //     gameTypes: {
  //       relation: Model.BelongsToOneRelation,
  //       modelClass: GameType,
  //       join: {
  //         from: 'games.game_types_id',
  //         to: 'game_types.id'
  //       }
  //     }
  //   }
  // }
}

module.exports = Game
