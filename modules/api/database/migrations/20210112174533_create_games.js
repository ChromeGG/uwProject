module.exports = {
  up: async (knex) => {
    await knex.schema.createTable('game_types', (table) => {
      table.bigIncrements('id').primary()
      table.string('name').notNullable()
      table.decimal('weight', 2, 1).notNullable().defaultTo(0.1)
      table.timestamp('created_at', { useTz: false }).defaultTo(knex.fn.now())
      table.timestamp('updated_at', { useTz: false }).defaultTo(knex.fn.now())
      table.comment('Table game_types is used to store types of games')
    })

    await knex.schema.createTable('games', (table) => {
      table.bigIncrements('id').primary()
      table
        .bigInteger('game_types_id')
        .unsigned()
        .notNullable()
      table
        .foreign('game_types_id')
        .references('game_types.id')
      table.text('moves').notNullable()
      table.timestamp('created_at', { useTz: false }).defaultTo(knex.fn.now())
      table.timestamp('updated_at', { useTz: false }).defaultTo(knex.fn.now())
      table.comment('Table games is used to store all played games')
    })

    await knex.schema.createTable('users_games', (table) => {
      table
        .bigInteger('game_id')
        .unsigned()
        .notNullable()
      table
        .foreign('game_id')
        .references('games.id')
      table
        .bigInteger('user_id')
        .unsigned()
        .notNullable()
      table
        .foreign('user_id')
        .references('users.id')
      table.integer('place').notNullable()
      table.timestamp('created_at', { useTz: false }).defaultTo(knex.fn.now())
      table.timestamp('updated_at', { useTz: false }).defaultTo(knex.fn.now())
      table.unique(['game_id', 'user_id'])
      table.comment('Table users_games is used to store players in games with taken places')
    })

    await knex.schema.createTable('ranks', (table) => {
      table
        .bigInteger('game_type_id')
        .unsigned()
        .notNullable()
      table
        .foreign('game_type_id')
        .references('game_types.id')
      table
        .bigInteger('user_id')
        .unsigned()
        .notNullable()
      table
        .foreign('user_id')
        .references('users.id')
      table.integer('rank').notNullable()
      table.timestamp('created_at', { useTz: false }).defaultTo(knex.fn.now())
      table.timestamp('updated_at', { useTz: false }).defaultTo(knex.fn.now())
      table.unique(['user_id', 'game_type_id'])
      table.comment('Table tank is used to store players ranks')
    })
  },
  down: async (knex) => {
    await knex.schema.dropTableIfExists('game_types')
    await knex.schema.dropTableIfExists('games')
    await knex.schema.dropTableIfExists('users_games')
    await knex.schema.dropTableIfExists('ranks')
  }
}
