const { integration } = require('../../tests/setup')

const { db, Tester } = integration()

const service = require('./gameService')

describe('can create a game', () => {
  test('should create a game', async () => {
    const [user1, user2, user3] = await Tester.hasUsers(3)
    const gameType = await Tester.hasGameType('Chess', 10)

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

    console.log(game)

    const usersGames = await Tester.grabFromDatabase('users_games')
    const ranks = await Tester.grabFromDatabase('ranks')

    // await service.createUser(db, {
    //   nickname: 'Joe'
    // })

    // const [user] = await Tester.grabFromDatabase('users')

    // expect(user).toMatchObject({
    //   nickname: 'Joe'
    // })
    // const users = await Tester.grabFromDatabase('users')
    // console.log(users)
    // const expensesFromDB = await Tester.grabFromDatabase('expenses')

    // expect(importsFromDB).toHaveLength(1)
    // expect(importsFromDB[0]).toMatchObject({
    //   fileName: 'september.html'
    // })
    // expect(expensesFromDB).toHaveLength(1)
    // expect(expensesFromDB[0]).toMatchObject({
    //   importId: importsFromDB[0].id,
    //   date: new Date('2020-02-02T00:00:00.000Z'),
    //   value: 99
    // })
  })
})
