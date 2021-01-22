const Base = require('./Base')
const { Model } = require('objection')

class Rank extends Base {
  static get tableName() {
    return 'ranks'
  }

  static get idColumn() {
    return null
  }

  static get relationMappings() {
    const User = require('./User')

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'ranks.user_id',
          to: 'users.id'
        }
      }
    }
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
