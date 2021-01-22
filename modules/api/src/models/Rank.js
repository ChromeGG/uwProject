const Base = require('./Base')

class Rank extends Base {
  static get tableName() {
    return 'ranks'
  }

  static get idColumn() {
    return null
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
}

module.exports = Rank
