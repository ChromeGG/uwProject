const Base = require('./Base')

class GameType extends Base {
  static get tableName() {
    return 'game_types'
  }

  static get timestamps() {
    return true
  }

  static get idColumn() {
    return 'id'
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        weight: { type: 'number' },
        createdAt: { type: 'timestamp' },
        updatedAt: { type: 'timestamp' }
      }
    }
  }
}

module.exports = GameType
