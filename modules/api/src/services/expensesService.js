const Import = require('../models/GameType')
const User = require('../models/User')

exports.importExpenses = async (db, { fileName, charges, recognition, balance }) => {
  const expensesImport = await Import.query(db).insert({ fileName })
  await expensesImport.$relatedQuery('expenses', db).insert(charges)
  return expensesImport
}

exports.updateExpense = async (db, expenseId, data) => User.query(db).updateAndFetchById(expenseId, data)

exports.deleteExpense = async (db, expenseId) => User.query(db).deleteById(expenseId)

exports.syncExpenseWithTags = async (db, expenseId, tagIds) => {
  const expense = await User.query(db).findById(expenseId)
  await expense.$relatedQuery('tags', db).unrelate()
  return expense.$relatedQuery('tags', db).relate(tagIds)
}
