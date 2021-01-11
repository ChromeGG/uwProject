const Import = require('../models/Import')
const Expenses = require('../models/Expense')
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
