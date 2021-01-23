const { functional } = require('../setup')

const { Tester } = functional()

describe('GET /users', () => {
  test('should return empty array when no users are found', async () => {
    const { statusCode, payload } = await Tester.request('GET', '/users')

    expect(statusCode).toEqual(200)
    expect(payload).toEqual([])
  })

  test('should return only one user', async () => {
    const user = await Tester.hasUser()

    const { statusCode, payload } = await Tester.request('GET', '/users')

    expect(statusCode).toEqual(200)
    expect(payload).toHaveLength(1)
    expect(payload).toContainObject({
      id: user.id,
      nickname: user.nickname,
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    })
  })

  test('should return multiple users', async () => {
    const [user1, user2] = await Tester.hasUsers(2)

    const { statusCode, payload } = await Tester.request('GET', '/users')

    expect(statusCode).toEqual(200)
    expect(payload).toHaveLength(2)
    expect(payload).toContainObject({
      id: user1.id,
      nickname: user1.nickname
    })
    expect(payload).toContainObject({
      id: user2.id,
      nickname: user2.nickname
    })
  })
})

describe('POST /users', () => {
  test('should create new user', async () => {
    const { statusCode, payload } = await Tester.request('POST', '/users', {
      payload: {
        nickname: 'Tester 1'
      }
    })

    expect(statusCode).toEqual(201)
    expect(payload).toMatchObject({
      id: expect.any(String),
      nickname: 'Tester 1'
    })

    const resultInDb = await Tester.grabFirstFromDatabase('users')
    expect(resultInDb).toMatchObject({
      nickname: 'Tester 1'
    })
  })
})
