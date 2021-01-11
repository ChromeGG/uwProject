const faker = require('faker')
const {
  importExpenses,
  syncExpenseWithTags
} = require('../../services/expensesService')

module.exports = db => {
  const hasImportedExpenses = async (name, charges = []) => {
    name = name || `${faker.random.words()}_${faker.random.uuid()}`
    if (charges.length === 0) {
      charges.push({ date: faker.date.recent(), value: faker.random.number() })
    }
    return importExpenses(db.getKnex(), { fileName: name, charges })
  }

  const hasTaggedExpense = async (expenseId, tagIds) => {
    return syncExpenseWithTags(db.getKnex(), expenseId, tagIds)
  }

  return {
    hasImportedExpenses,
    hasTaggedExpense
  }
}
