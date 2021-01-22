const { functional } = require('../setup')

const { Tester } = functional()

describe('GET /games', () => {
  test('should return only one game ', async () => {
    const [user1, user2] = await Tester.hasUsers(2)
    const gameType = await Tester.hasGameType('chess')
    const game = await Tester.hasGame({ users: [user1, user2], gameType })
    // console.log(game)

    const { statusCode, payload } = await Tester.request('GET', '/games')

    console.log(payload)

    expect(statusCode).toEqual(200)
    expect(payload).toEqual([])
  })

  // test('should return only one game type', async () => {
  //   const gameType = await Tester.hasGameType()

  //   const { statusCode, payload } = await Tester.request('GET', '/game-types')

  //   expect(statusCode).toEqual(200)
  //   expect(payload).toHaveLength(1)
  //   expect(payload).toContainObject({
  //     id: gameType.id,
  //     name: gameType.name,
  //     createdAt: expect.any(String),
  //     updatedAt: expect.any(String)
  //   })
  // })
})
