const Base = require('./Base')
const { Model } = require('objection')

class Game extends Base {
  static get tableName() {
    return 'games'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],

      properties: {
        id: { type: 'string' },
        gameTypesId: { type: 'string' },
        moves: { type: 'string' },
        date: { type: 'date' },
        createdAt: { type: 'timestamp' },
        updatedAt: { type: 'timestamp' }
      }
    }
  }

  static get relationMappings() {
    const GameType = require('./GameType')

    return {
      gameTypes: {
        relation: Model.BelongsToOneRelation,
        modelClass: GameType,
        join: {
          from: 'games.game_types_id',
          to: 'game_types.id'
        }
      }
    }
  }
}

module.exports = Game
