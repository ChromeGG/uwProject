const Game = require('../models/Game')

exports.getGames = async (db, query) => {
  const games = await Game.query(db)
    .select('*')
    .withGraphJoined('gameType')
    .withGraphJoined('users')
    .orderBy('games.id', 'ASC')
  if (!games.length) {
    return []
  }

  return games
}
