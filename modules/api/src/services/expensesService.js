const Import = require('../models/Import')
const Expense = require('../models/Expense')

exports.importExpenses = async (
  db,
  { fileName, charges, recognition, balance }
) => {
  const expensesImport = await Import.query(db).insert({ fileName })
  await expensesImport.$relatedQuery('expenses', db).insert(charges)
  return expensesImport
}

exports.updateExpense = async (db, expenseId, data) =>
  Expense.query(db).updateAndFetchById(expenseId, data)

exports.deleteExpense = async (db, expenseId) =>
  Expense.query(db).deleteById(expenseId)

exports.syncExpenseWithTags = async (db, expenseId, tagIds) => {
  const expense = await Expense.query(db).findById(expenseId)
  await expense.$relatedQuery('tags', db).unrelate()
  return expense.$relatedQuery('tags', db).relate(tagIds)
}
