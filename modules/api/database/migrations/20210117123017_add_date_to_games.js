module.exports = {
  up: async (knex) => {
    await knex.schema.table('games', (table) => {
      table.date('date').notNullable()
    })
  },
  down: async (knex) => {
    await knex.schema.table('games', (table) => {
      table.dropColumn('date')
    })
  }
}
