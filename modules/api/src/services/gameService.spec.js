const { integration } = require('../../tests/setup')

const { db, Tester } = integration()

const service = require('./gameService')

describe('can create a game', () => {
  test('should create a game for users without ranks', async () => {
    const [user1, user2, user3] = await Tester.hasUsers(3)
    const gameType = await Tester.hasGameType('Chess', 10)

    const game = await service.createGame(db, {
      gameTypeId: gameType.id,
      date: '2021-01-11',
      moves: `1.e4 e5
      2.Hh5 Sc6
      3.Gc4 Sf6
      4.Hxf7#`,
      users: [{ id: user1.id, place: 1 }, { id: user2.id, place: 2 }, { id: user3.id, place: 3 }]
    })

    const usersGames = await Tester.grabFromDatabase('users_games', {}, '*', 'gameId')
    const ranks = await Tester.grabFromDatabase('ranks', true, '*', 'userId')

    expect(game).toMatchObject({
      gameTypesId: gameType.id,
      moves: '1.e4 e5\n      2.Hh5 Sc6\n      3.Gc4 Sf6\n      4.Hxf7#',
      date: '2021-01-11',
      id: expect.any(String)
    })

    expect(usersGames).toMatchObject([
      { gameId: game.id, userId: user1.id, place: 1 },
      { gameId: game.id, userId: user2.id, place: 2 },
      { gameId: game.id, userId: user3.id, place: 3 }
    ])

    expect(ranks).toMatchObject([
      { gameTypeId: gameType.id, userId: user1.id, rank: 1050 },
      { gameTypeId: gameType.id, userId: user2.id, rank: 1025 },
      { gameTypeId: gameType.id, userId: user3.id, rank: 1017 }
    ])
  })

  test('should create a game for users with ranks', async () => {
    const [user1, user2, user3] = await Tester.hasUsers(3)
    const gameType = await Tester.hasGameType('Chess', 10)
    await Tester.giveRank(user1, gameType, 500)
    await Tester.giveRank(user2, gameType, 1000)
    await Tester.giveRank(user3, gameType, 1500)

    const game = await service.createGame(db, {
      gameTypeId: gameType.id,
      date: '2021-01-11',
      moves: `
      1.e4 e5
      2.Hh5 Sc6
      3.Gc4 Sf6
      4.Hxf7#`,
      users: [{ id: user1.id, place: 1 }, { id: user2.id, place: 2 }, { id: user3.id, place: 3 }]
    })

    const usersGames = await Tester.grabFromDatabase('users_games', {}, '*', 'gameId')
    const ranks = await Tester.grabFromDatabase('ranks', true, '*', 'userId')

    expect(game).toMatchObject({
      gameTypesId: gameType.id,
      moves: '\n      1.e4 e5\n      2.Hh5 Sc6\n      3.Gc4 Sf6\n      4.Hxf7#',
      date: '2021-01-11',
      id: expect.any(String)
    })

    expect(usersGames).toMatchObject([
      { gameId: game.id, userId: user1.id, place: 1 },
      { gameId: game.id, userId: user2.id, place: 2 },
      { gameId: game.id, userId: user3.id, place: 3 }
    ])

    expect(ranks).toMatchObject([
      { gameTypeId: gameType.id, userId: user1.id, rank: 686 },
      { gameTypeId: gameType.id, userId: user2.id, rank: 1023 },
      { gameTypeId: gameType.id, userId: user3.id, rank: 1383 }
    ])
  })

  test('should create a game for users - mixed scenario', async () => {
    const [user1, user2, user3] = await Tester.hasUsers(3)
    const gameType = await Tester.hasGameType('Chess', 10)
    await Tester.giveRank(user1, gameType, 500)
    await Tester.giveRank(user3, gameType, 1500)

    const game = await service.createGame(db, {
      gameTypeId: gameType.id,
      date: '2021-01-11',
      moves: `
      1.e4 e5
      2.Hh5 Sc6
      3.Gc4 Sf6
      4.Hxf7#`,
      users: [{ id: user1.id, place: 1 }, { id: user2.id, place: 2 }, { id: user3.id, place: 3 }]
    })

    const usersGames = await Tester.grabFromDatabase('users_games', {}, '*', 'gameId')
    const ranks = await Tester.grabFromDatabase('ranks', true, '*', 'userId')

    expect(game).toMatchObject({
      gameTypesId: gameType.id,
      moves: '\n      1.e4 e5\n      2.Hh5 Sc6\n      3.Gc4 Sf6\n      4.Hxf7#',
      date: '2021-01-11',
      id: expect.any(String)
    })

    expect(usersGames).toMatchObject([
      { gameId: game.id, userId: user1.id, place: 1 },
      { gameId: game.id, userId: user2.id, place: 2 },
      { gameId: game.id, userId: user3.id, place: 3 }
    ])

    expect(ranks).toMatchObject([
      { gameTypeId: gameType.id, userId: user1.id, rank: 686 },
      { gameTypeId: gameType.id, userId: user2.id, rank: 1023 },
      { gameTypeId: gameType.id, userId: user3.id, rank: 1383 }
    ])
  })
})
