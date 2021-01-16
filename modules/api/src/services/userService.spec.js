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
