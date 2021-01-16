const Import = require('../models/GameType')
const Expenses = require('../models/User')
const Boom = require('@hapi/boom')

exports.getImports = async db => Import.query(db)
exports.getExpenses = async (db, importId) => {
  if (importId) {
    const expenseImport = await Import.query(db).findById(importId)
    if (!expenseImport) {
      throw Boom.notFound()
    }
    return expenseImport
      .$relatedQuery('expenses', db)
      .eager('tags')
      .orderBy('id', 'ASC')
  }
  return Expenses.query(db)
    .eager('tags')
    .orderBy('id', 'ASC')
}
exports.getExpense = async (db, expenseId) => {
  const expense = await Expenses.query(db)
    .eager('tags')
    .findById(expenseId)
  if (!expense) {
    throw Boom.notFound()
  }
  return expense
}
