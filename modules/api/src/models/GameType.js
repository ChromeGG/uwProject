const Base = require('./Base')

class GameType extends Base {
  static get tableName() {
    return 'game_types'
  }

  static get timestamps() {
    return true
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

  // static get jsonSchema() {
  //   return {
  //     type: 'object',
  //     required: ['fileName'],

  //     properties: {
  //       id: { type: 'integer' },
  //       fileName: { type: 'string' }
  //     }
  //   }
  // }

  // static get relationMappings() {
  //   const Expense = require('./Expense')

  //   return {
  //     expenses: {
  //       relation: Model.HasManyRelation,
  //       modelClass: Expense,
  //       join: {
  //         from: 'imports.id',
  //         to: 'expenses.importId'
  //       }
  //     }
  //   }
  // }
}

module.exports = GameType
