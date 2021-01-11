const Joi = require('@hapi/joi')
const {
  deleteExpense,
  updateExpense,
  syncExpenseWithTags
} = require('../services/expensesService')
const { getExpenses, getExpense } = require('../readers/expensesReader')

exports.index = {
  auth: false,
  description: 'Get all expenses',
  notes: 'Get expenses',
  tags: ['api'],
  handler: async ({ db }, h) => {
    return getExpenses(db)
  }
}

exports.show = {
  auth: false,
  description: 'Get single expense',
  notes: 'Get expense',
  tags: ['api'],
  handler: async ({ db, params: { expenseId } }, h) => {
    return getExpense(db, expenseId)
  }
}

exports.destory = {
  auth: false,
  description: 'Delete single expense',
  notes: 'Delete expense',
  tags: ['api'],
  validate: {
    params: Joi.object({
      expenseId: Joi.number().integer()
    })
  },
  handler: async ({ db, params: { expenseId } }, h) => {
    return deleteExpense(db, expenseId)
  }
}

exports.update = {
  auth: false,
  description: 'Update single expense',
  notes: 'Update expense',
  tags: ['api'],
  validate: {
    params: Joi.object({
      expenseId: Joi.number().integer()
    }),
    payload: Joi.object({
      description: Joi.string().allow('')
    })
  },
  handler: async ({ db, params: { expenseId }, payload: { description } }) => {
    return updateExpense(db, expenseId, { description })
  }
}

exports.syncTags = {
  auth: false,
  description: 'Sync single expense tags',
  notes: 'Sync single expense tags',
  tags: ['api'],
  validate: {
    params: Joi.object({
      expenseId: Joi.number().integer()
    }),
    payload: Joi.object({
      tagIds: Joi.array().items(
        Joi.number()
          .integer()
          .optional()
      )
    })
  },
  handler: async ({ db, params: { expenseId }, payload: { tagIds } }, h) => {
    return syncExpenseWithTags(db, expenseId, tagIds)
  }
}
