const { functional } = require('../setup')

const { Tester } = functional()

describe('GET /ranks', () => {
  test('should return only one game ', async () => {
    const [user1, user2] = await Tester.hasUsers(2)
    const gameType = await Tester.hasGameType('chess')
    await Tester.hasGame({ users: [user1, user2], gameType })

    const { statusCode, payload } = await Tester.request('GET', '/rank', {
      query: { gameTypeId: gameType.id }
    })

    console.log(payload)

    expect(statusCode).toEqual(200)
    expect(payload).toEqual([])
  })
})
