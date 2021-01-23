const { functional } = require('../setup')

const { Tester } = functional()

describe('GET /games', () => {
  test('should return only one game ', async () => {
    const [user1, user2] = await Tester.hasUsers(2)
    const gameType = await Tester.hasGameType('chess')
    await Tester.hasGame({ users: [user1, user2], gameType })

    const { statusCode } = await Tester.request('GET', '/games')

    expect(statusCode).toEqual(200)
  })
})
