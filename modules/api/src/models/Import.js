const { Model } = require('objection')

class Import extends Model {
  static get tableName() {
    return 'imports'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['fileName'],

      properties: {
        id: { type: 'integer' },
        fileName: { type: 'string' }
      }
    }
  }

  static get relationMappings() {
    const Expense = require('./Expense')

    return {
      expenses: {
        relation: Model.HasManyRelation,
        modelClass: Expense,
        join: {
          from: 'imports.id',
          to: 'expenses.importId'
        }
      }
    }
  }
}

module.exports = Import
