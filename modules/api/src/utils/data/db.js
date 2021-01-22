const { is, isNil } = require('ramda')

module.exports = db => {
  const grabFromDatabase = async (table, condition = {}, select = '*', orderBy = 'id') => {
    if (is(Object, table)) {
      table = table.getTableName()
    }

    return db
      .getKnex()
      .from(table)
      .where(condition)
      .orderBy(orderBy)
      .select(select)
  }

  const grabFirstFromDatabase = async (table, condition = {}, select = '*') => {
    if (is(Object, table)) {
      table = table.getTableName()
    }

    return db
      .getKnex()
      .from(table)
      .where(condition)
      .orderBy('id')
      .select(select)
      .first()
  }

  const seeInDatabase = async (table, condition) => {
    return !isNil(await grabFirstFromDatabase(table, condition))
  }

  const hasInDatabase = async (table, data = {}) => {
    if (is(Object, table)) {
      table = table.getTableName()
    }
    return db
      .getKnex()
      .from(table)
      .insert(data)
      .returning('*')
  }

  return {
    seeInDatabase,
    seeInDatabaseById: (table, id) => seeInDatabase(table, { id }),
    grabFromDatabase,
    grabFromDatabaseById: (table, id) => grabFirstFromDatabase(table, { id }),
    grabFirstFromDatabase,
    hasInDatabase
  }
}
