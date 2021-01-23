const { functional } = require('../setup')

const { Tester } = functional()

describe('GET /game-types', () => {
  test('should return empty array when no users are found', async () => {
    const { statusCode, payload } = await Tester.request('GET', '/game-types')

    expect(statusCode).toEqual(200)
    expect(payload).toEqual([])
  })

  test('should return only one game type', async () => {
    const gameType = await Tester.hasGameType()

    const { statusCode, payload } = await Tester.request('GET', '/game-types')

    expect(statusCode).toEqual(200)
    expect(payload).toHaveLength(1)
    expect(payload).toContainObject({
      id: gameType.id,
      name: gameType.name,
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    })
  })
})

describe('POST /game-types', () => {
  test('should create new game type', async () => {
    const { statusCode, payload } = await Tester.request('POST', '/game-types', {
      payload: {
        name: 'Chess',
        weight: 20
      }
    })

    expect(statusCode).toEqual(201)
    expect(payload).toMatchObject({
      id: expect.any(String),
      name: 'Chess',
      weight: 0.2
    })

    const resultInDb = await Tester.grabFirstFromDatabase('game_types')
    expect(resultInDb).toMatchObject({
      name: 'Chess',
      weight: '0.2'
    })
  })
})