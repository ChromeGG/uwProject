const Base = require('./Base')
const { Model } = require('objection')

class Game extends Base {
  static get tableName() {
    return 'games'
  }

  static get idColumn() {
    return 'id'
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
    const User = require('./User')

    return {
      gameType: {
        relation: Model.BelongsToOneRelation,
        modelClass: GameType,
        join: {
          from: 'games.game_types_id',
          to: 'game_types.id'
        }
      },
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'games.id',
          through: {
            from: 'users_games.game_id',
            to: 'users_games.user_id'
          },
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = Game
