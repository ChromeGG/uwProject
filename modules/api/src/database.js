const knex = require('knex')
const { db } = require('../config/config')()
const { transaction, knexSnakeCaseMappers } = require('objection')

exports.transaction = transaction

exports.initDatabase = () => {
  let trx = null
  const connection = knex({ ...db, ...knexSnakeCaseMappers() })

  return {
    getKnex() {
      if (trx) {
        return trx
      }
      return connection
    },

    async startTransaction() {
      trx = await transaction.start(connection)
      return trx
    },
    async rollbackTransaction() {
      await trx.rollback()
      trx = null
    },
    async destroy() {
      await connection.destroy()
    }
  }
}
