const { functional } = require('../setup')

const { Tester } = functional()

describe('GET /reports', () => {
  test('should return empty result when there is no data', async () => {
    const { statusCode, payload } = await Tester.request('GET', '/reports')

    expect(statusCode).toEqual(200)
    expect(payload).toMatchObject({
      series: [
        {
          data: [],
          label: 'total'
        }
      ]
    })
  })

  test('should return correct result when data is available', async () => {
    const {
      expenses: [{ date, value }]
    } = await Tester.hasImportedExpenses()

    const { statusCode, payload } = await Tester.request('GET', '/reports')

    const data = [{ x: date.toISOString().substring(0, 10), y: value }]

    expect(statusCode).toEqual(200)
    expect(payload).toMatchObject({
      series: [
        {
          data: data,
          label: 'total'
        }
      ]
    })
  })

  test('should return multiple series', async () => {
    const charges = [
      { date: '2020-03-11', value: 100 },
      { date: '2020-03-21', value: 50 },
      { date: '2020-03-30', value: 25 },
      { date: '2020-04-01', value: 200 }
    ]
    const { expenses } = await Tester.hasImportedExpenses('Test', charges)

    const tag = await Tester.hasTag('House')
    const tag2 = await Tester.hasTag('Company')

    await Tester.hasTaggedExpense(expenses[0].id, tag.id)
    await Tester.hasTaggedExpense(expenses[1].id, tag2.id)
    await Tester.hasTaggedExpense(expenses[2].id, tag2.id)

    const { statusCode, payload } = await Tester.request('GET', '/reports')

    expect(statusCode).toEqual(200)

    expect(payload).toMatchObject({
      series: [
        {
          label: 'total',
          data: [
            {
              x: expenses[0].date,
              y: expenses[0].value
            },
            {
              x: expenses[1].date,
              y: expenses[1].value
            },
            {
              x: expenses[2].date,
              y: expenses[2].value
            },
            {
              x: expenses[3].date,
              y: expenses[3].value
            }
          ]
        },
        {
          label: 'House',
          data: [
            {
              x: expenses[0].date,
              y: expenses[0].value
            }
          ]
        },
        {
          label: 'Company',
          data: [
            {
              x: expenses[1].date,
              y: expenses[1].value
            },
            {
              x: expenses[2].date,
              y: expenses[2].value
            }
          ]
        }
      ]
    })
  })
})
