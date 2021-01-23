const { integration } = require('../../tests/setup')

const { db, Tester } = integration()

const service = require('./userService')

describe('createUser', () => {
  test('should create a user', async () => {
    await service.createUser(db, {
      nickname: 'Joe'
    })

    const [user] = await Tester.grabFromDatabase('users')

    expect(user).toMatchObject({
      nickname: 'Joe'
    })
  })
})
