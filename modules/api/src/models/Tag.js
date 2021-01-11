const { Model } = require('objection')

class Tag extends Model {
  static get tableName() {
    return 'tags'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        id: { type: 'integer' },
        name: { type: 'string' }
      }
    }
  }

  static get relationMappings() {
    const Expense = require('./Expense')

    return {
      expenses: {
        relation: Model.ManyToManyRelation,
        modelClass: Expense,
        join: {
          from: 'tags.id',
          through: {
            from: 'tags_expenses.tag_id',
            to: 'tags_expenses.expense_id'
          },
          to: 'expenses.id'
        }
      }
    }
  }
}

module.exports = Tag
