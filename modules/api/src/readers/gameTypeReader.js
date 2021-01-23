const GameTypes = require('../models/GameType')

exports.getGameTypes = async (db, query) => {
  const gameTypes = await GameTypes.query(db).select('*').orderBy('id', 'ASC')
  if (!gameTypes.length) {
    return []
  }

  const results = gameTypes.map(({ id, name, weight, createdAt, updatedAt }) => {
    return { id, name, createdAt, updatedAt, weight: weight * 100 }
  })

  return results
}
