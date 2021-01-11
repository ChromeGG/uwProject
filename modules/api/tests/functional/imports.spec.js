const { functional } = require('../setup')

const { Tester } = functional()

describe.skip('POST /imports', () => {
  test('should validate required fields', async () => {
    const { statusCode, payload } = await Tester.request('POST', '/imports', {
      payload: {}
    })

    expect(statusCode).toEqual(422)
    expect(payload).toMatchObject({
      statusCode: 422,
      message: 'Unprocessable Entity',
      errors: {
        fileName: ['"fileName" is required'],
        expenses: ['"expenses" is required']
      }
    })
  })

  test('should validate payload', async () => {
    const { statusCode, payload } = await Tester.request('POST', '/imports', {
      payload: {
        fileName: 123,
        expenses: [{ date: '123', value: 'test' }]
      }
    })

    expect(statusCode).toEqual(422)
    expect(payload).toMatchObject({
      statusCode: 422,
      message: 'Unprocessable Entity',
      errors: {
        fileName: ['"fileName" must be a string'],
        date: ['"expenses[0].date" must be in ISO 8601 date format'],
        value: ['"expenses[0].value" must be a number']
      }
    })
  })

  test('should validate multiple expenses', async () => {
    const { statusCode, payload } = await Tester.request('POST', '/imports', {
      payload: {
        fileName: 'test.html',
        expenses: [
          { date: '123', value: 123 },
          { date: '2020-02-02', value: 'test' },
          { date: '123', value: 'test' },
          { date: '123', value: 'test' }
        ]
      }
    })

    expect(statusCode).toEqual(422)
    expect(payload).toMatchObject({
      statusCode: 422,
      message: 'Unprocessable Entity',
      errors: {
        date: [
          '"expenses[0].date" must be in ISO 8601 date format',
          '"expenses[2].date" must be in ISO 8601 date format',
          '"expenses[3].date" must be in ISO 8601 date format'
        ],
        value: [
          '"expenses[1].value" must be a number',
          '"expenses[2].value" must be a number',
          '"expenses[3].value" must be a number'
        ]
      }
    })
  })

  test('should import new expenses', async () => {
    // 1. Setup
    // 2. Test
    const { statusCode, payload } = await Tester.request('POST', '/imports', {
      payload: {
        fileName: 'test.html',
        expenses: [
          { date: '2020-02-02', value: 99 },
          { date: '2020-02-02', value: 99 }
        ]
      }
    })

    // 3. Assertions
    expect(statusCode).toEqual(201)
    expect(payload).toMatchObject({
      id: expect.any(Number),
      fileName: 'test.html',
      expenses: expect.any(Array)
    })
    expect(payload.expenses).toHaveLength(2)
    expect(payload.expenses).toContainObject({
      date: '2020-02-02T00:00:00.000Z',
      id: expect.any(Number),
      importId: expect.any(Number),
      value: 99
    })

    // Check what we have in database
    const imports = await Tester.grabFromDatabase('imports')
    const expenses = await Tester.grabFromDatabase('expenses')

    expect(imports).toHaveLength(1)
    expect(imports[0]).toMatchObject({
      id: expect.any(Number),
      fileName: 'test.html',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    })
    expect(expenses).toHaveLength(2)
    expect(expenses[0]).toMatchObject({
      date: new Date('2020-02-02'),
      id: expect.any(Number),
      importId: expect.any(Number),
      value: 99
    })
  })
})

describe('GET /imports', () => {
  test('should return empty array when no imports found', async () => {
    const { statusCode, payload } = await Tester.request('GET', '/imports')

    expect(statusCode).toEqual(200)
    expect(payload).toEqual([])
  })

  test('should return existing imports', async () => {
    // Setup
    const { id, fileName } = await Tester.hasImportedExpenses()

    // Test
    const { statusCode, payload } = await Tester.request('GET', '/imports')

    // Assertions
    expect(statusCode).toEqual(200)
    expect(payload).toHaveLength(1)
    expect(payload[0]).toMatchObject({
      id,
      fileName
    })
  })

  test('should return multiple imports', async () => {
    const import1 = await Tester.hasImportedExpenses()
    const import2 = await Tester.hasImportedExpenses()

    const { statusCode, payload } = await Tester.request('GET', '/imports')

    expect(statusCode).toEqual(200)
    expect(payload).toHaveLength(2)
    expect(payload).toContainObject({
      id: import1.id,
      fileName: import1.fileName
    })
    expect(payload).toContainObject({
      id: import2.id,
      fileName: import2.fileName
    })
  })
})

describe('GET /imports/{importId}/expenses', () => {
  test('should return choosen expense when correct importId is present', async () => {
    const {
      id,
      expenses: [expanse]
    } = await Tester.hasImportedExpenses()

    const { statusCode, payload } = await Tester.request(
      'GET',
      `/imports/${id}/expenses`
    )

    expect(statusCode).toEqual(200)
    expect(payload).toHaveLength(1)
    expect(payload[0]).toMatchObject({
      id: expanse.id,
      value: expanse.value,
      importId: expanse.importId
    })
  })
})

describe('DELETE /imports/{importId}', () => {
  test('should validate importId', async () => {
    const { statusCode, payload } = await Tester.request(
      'DELETE',
      '/imports/incorrectId123'
    )

    expect(statusCode).toEqual(422)
    expect(payload).toHaveProperty('errors', {
      importId: ['"importId" must be a number']
    })
  })

  test('should return 204 even when import does not exist', async () => {
    const { statusCode, payload } = await Tester.request(
      'DELETE',
      '/imports/823462358'
    )

    expect(statusCode).toEqual(204)
    expect(payload).toEqual('')
  })

  test('should delete existing import', async () => {
    const { id: importId } = await Tester.hasImportedExpenses()

    const { statusCode, payload } = await Tester.request(
      'DELETE',
      `/imports/${importId}`
    )

    const checkDb = await Tester.seeInDatabase('imports', { id: importId })

    expect(statusCode).toEqual(204)
    expect(payload).toEqual('')
    expect(checkDb).toBeFalsy()
  })
})
