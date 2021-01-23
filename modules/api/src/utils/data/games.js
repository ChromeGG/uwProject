// const faker = require('faker')
const { createGame } = require('../../services/gameService')

module.exports = (db) => {
  const hasGame = async ({ users, gameType, date = new Date(), moves = 'Test 1, test 2' }) => {
    const preparedUsers = []
    let placeCounter = 1
    for (const { id } of users) {
      preparedUsers.push({ id, place: placeCounter })
      placeCounter++
    }
    return createGame(db.getKnex(), { users: preparedUsers, gameTypeId: gameType.id, moves, date })
  }

  return {
    hasGame
  }
}
