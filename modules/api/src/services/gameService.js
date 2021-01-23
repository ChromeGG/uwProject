// const Boom = require('@hapi/boom')
const GameType = require('../models/GameType')
const Game = require('../models/Game')
const UsersGames = require('../models/UsersGames')
const Rank = require('../models/Rank')

const DEFAULT_GAME_RANK = 1000

exports.createGame = async (db, { gameTypeId, date, moves, users }) => {
  // 1. Sprawdzić czy usery mają jakieś rankingi z danych typów gier
  // 2. Jeśli mają, to przypisz im aktualny, jeśli nie - daj 1000
  // 3. Weź weight z game_types i rozdziel ranking
  // 4. Wprowadź grę do BD
  // 5. Wprowadź do users_games
  // 6. Wprowadź rankingów

  const usersIds = users.map(({ id }) => id)

  const usersWithRanks = await Rank.query(db)
    .select('user_id', 'game_type_id', 'rank')
    .whereIn('user_id', usersIds)
    .where('game_type_id', gameTypeId)

  const usersWithFilledRanks = []
  const userWithoutRanks = []
  for (const user of users) {
    if (!usersWithRanks.some(({ userId }) => userId === user.id)) {
      user.rank = DEFAULT_GAME_RANK
      userWithoutRanks.push(user)
    } else {
      const { rank } = usersWithRanks.find(({ userId }) => userId === user.id)
      user.rank = rank
    }
    usersWithFilledRanks.push({ id: user.id, rank: user.rank })
  }

  const mergeById = (a1, a2) =>
    a1.map((itm) => ({
      ...a2.find((item) => item.id === itm.id && item),
      ...itm
    }))

  const completeUsersList = mergeById(users, usersWithFilledRanks)

  const { weight } = await GameType.query(db)
    .select('weight')
    .first({ id: gameTypeId })

  const sortedByPlace = completeUsersList.sort((a, b) => (a.place > b.place ? 1 : b.place > a.place ? -1 : 0))

  const BONUS = 50
  for (let i = 0; i <= sortedByPlace.length - 1; i++) {
    let currentRank = sortedByPlace[i].rank + BONUS / (i + 1)
    for (let j = i + 1; j < sortedByPlace.length; j++) {
      if (currentRank < sortedByPlace[j].rank) {
        const difference = Math.abs((currentRank - sortedByPlace[j].rank) * weight)
        currentRank += difference
        sortedByPlace[j].rank -= difference
      }
    }
    sortedByPlace[i].rank = Math.round(currentRank)
  }


  const game = await Game.query(db).insert({ gameTypesId: gameTypeId, moves, date })
  const sortedByPlaceWithoutRank = sortedByPlace.map((user) => {
    return { gameId: game.id, userId: user.id, place: user.place }
  })

  await UsersGames.query(db).insert(sortedByPlaceWithoutRank)

  // Update ranks
  for (const user of usersWithRanks) {
    const { rank } = sortedByPlace.find(({ id }) => user.userId === id)

    await Rank.query(db)
      .patch({ rank })
      .where({ userId: user.userId })
      .where({ gameTypeId })
  }

  for (const user of userWithoutRanks) {
    const { rank } = sortedByPlace.find(({ id }) => user.id === id)
    await Rank.query(db)
      .insert({ rank, userId: user.id, gameTypeId })
      .select('rank')
  }

  return game
}
