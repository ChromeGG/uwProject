const Base = require('./Base')

class UsersGames extends Base {
  static get tableName() {
    return 'users_games'
  }

  static get idColumn() {
    return 'game_id'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],

      properties: {
        gameId: { type: 'string' },
        userId: { type: 'string' },
        place: { type: 'number' }
      }
    }
  }
}

module.exports = UsersGames
