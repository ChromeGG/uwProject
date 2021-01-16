const Base = require('./Base')

class User extends Base {
  static get tableName() {
    return 'users'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],

      properties: {
        id: { type: 'string' },
        nickname: { type: 'string' },
        createdAt: { type: 'timestamp' },
        updatedAt: { type: 'timestamp' }
      }
    }
  }

  // static get relationMappings() {
  //   const Import = require('./Import')
  //   const Tag = require('./Tag')

  //   return {
  //     expenses: {
  //       relation: Model.BelongsToOneRelation,
  //       modelClass: Import,
  //       join: {
  //         from: 'expenses.importId',
  //         to: 'imports.id'
  //       }
  //     },
  //     tags: {
  //       relation: Model.ManyToManyRelation,
  //       modelClass: Tag,
  //       join: {
  //         from: 'expenses.id',
  //         through: {
  //           from: 'tags_expenses.expense_id',
  //           to: 'tags_expenses.tag_id'
  //         },
  //         to: 'tags.id'
  //       }
  //     }
  //   }
  // }
}

module.exports = User
