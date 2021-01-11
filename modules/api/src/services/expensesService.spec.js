const { integration } = require('../../tests/setup')

const { db, Tester } = integration()

const service = require('./expensesService')

describe('createExpenses', () => {
  test('should create a single expanse', async () => {
    await service.importExpenses(db, {
      fileName: 'september.html',
      charges: [{ date: '2020-02-02', value: 99 }],
      recognition: [],
      balance: 99
    })

    const importsFromDB = await Tester.grabFromDatabase('imports')
    const expensesFromDB = await Tester.grabFromDatabase('expenses')

    expect(importsFromDB).toHaveLength(1)
    expect(importsFromDB[0]).toMatchObject({
      fileName: 'september.html'
    })
    expect(expensesFromDB).toHaveLength(1)
    expect(expensesFromDB[0]).toMatchObject({
      importId: importsFromDB[0].id,
      date: new Date('2020-02-02T00:00:00.000Z'),
      value: 99
    })
  })
})
